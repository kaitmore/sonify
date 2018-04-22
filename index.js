import _ from "lodash";
import notes from "./notes";
import { validateArgs, percent } from "./helpers";

const MS_PER_YEAR = 31540000000;

/**
 * @class Sonify
 * @param {number} bpm - Beats per minute of the song
 * @param {number} sec_per_songyear - Number of seconds to represent each year in the source data
 * @param {number} octaves - Number of octaves that the song should span
 * @param {number} base_octave - Base octave
 * @return {Sonify} - A Sonify object
 */
class Sonify {
  constructor(bpm, sec_per_songyear, octaves = 3, base_octave = 6) {
    this.pitches = _.uniq(_.values(notes));
    this.maxPitch = octaves * 8 + base_octave * 8;
    this.minPitch = base_octave * 8;
    this.context = {};
    this.currentTime = 0;
    this.ms_per_songyear = sec_per_songyear * 1000;
    this.beats_per_sec = 1 / (bpm / 60);
  }
}
/**
 * _setContext
 * Creates a new web audio context in the window and sets currentTime
 * to the newly created context's currentTime
 * @return {void}
 */
function _setContext() {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.currentTime = this.context.currentTime;
}
/**
 * _clearContext
 * Clears the web audio context if the current state is "running"
 * and resets the internal currentTime to 0
 * @return {void}
 */
function _clearContext() {
  if (this.context && this.context.state === "running") {
    this.context.close();
    this.currentTime = 0;
  }
}

/**
 * _createSound
 * Takes two frequencies and a note length (in beats) and
 * creates a gain and oscillator node.
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
function _createSound(freq, nextFreq, noteLength) {
  const gainNode = this.context.createGain();
  gainNode.connect(this.context.destination);
  const oscillator = this.context.createOscillator();

  // The following stanza sets the gain value low at the beginning and ends of a note
  // to mitigate the clicking sound from starting and stopping the oscillator node.
  gainNode.gain.setValueAtTime(0.001, this.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.5,
    this.currentTime + noteLength / 12
  );
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    this.currentTime + noteLength
  );

  oscillator.frequency.setValueAtTime(freq, this.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    nextFreq,
    this.currentTime + noteLength
  );
  oscillator.start(this.currentTime);
  oscillator.stop(this.currentTime + noteLength);

  this.currentTime += noteLength;
  oscillator.connect(gainNode);
}

/**
 * mapNodesToPitches
 * Take an array of data point objects with the keys "time" and "value" and
 * return a transformed object with a "value" property representing a pitch within
 * the given octave range
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
Sonify.prototype.mapNodesToPitches = function(data, threshold) {
  const maxDataPoint = _.maxBy(data, "value").value;
  const minDataPoint = _.minBy(data, "value").value;
  return data.map(point => {
    const isDataFormatted = validateArgs(
      point,
      ["value", "time"],
      "Please format your data with a value and time key"
    );
    if (!isDataFormatted) return;
    const percent =
      (point.value - minDataPoint) / (maxDataPoint - minDataPoint);
    return {
      ...point,
      value: Math.round(
        percent * (this.maxPitch - this.minPitch) + this.minPitch
      )
    };
  });
};

/**
 * mapTimeToNoteLength
 * Take an array of data point objects with the keys "time" and "value" and
 * return a transformed object with a "noteLength" property that represents
 * a note length in beats per second
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
Sonify.prototype.mapTimeToNoteLength = function(data) {
  const startTime = _.minBy(data, "time").time;
  const endTime = _.maxBy(data, "time").time;
  const totalTimeMs = endTime - startTime;
  const songLength = this.ms_per_songyear * totalTimeMs / MS_PER_YEAR;
  const timedData = [];

  for (let i = 0; i < data.length; i++) {
    const isDataFormatted = validateArgs(
      data[i],
      ["value", "time"],
      "Please format your data with a value and time key"
    );
    if (!isDataFormatted) break;

    if (i !== data.length - 1) {
      // if we're not on the last loop
      let current = data[i].time;
      let next = data[i + 1].time;
      let currentPointInSong =
        percent(current, startTime, totalTimeMs) * songLength;
      let nextPointInSong = percent(next, startTime, totalTimeMs) * songLength;
      let noteLengthSecs = (nextPointInSong - currentPointInSong) / 60;
      let beats = this.beats_per_sec * noteLengthSecs;

      timedData.push({ ...data[i], noteLength: beats });
    } else {
      timedData.push({ ...data[i], noteLength: 1 });
    }
  }
  return timedData;
};

/**
 * play
 * Maps through data with keys "value", "time", and "noteLength", and
 * calls this._createSound to create the appropriate nodes
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point representing a pitch
 * @param {string} data[].time - Unix timestamp value
 * @param {string} data[].noteLength - Interger value that represents a note length in beats per second
 * @returns {void}
 */
Sonify.prototype.play = function(data) {
  if (this.context.state === "running") {
    _clearContext.call(this);
  }

  _setContext.call(this);

  for (var i = 0; i < data.length; i++) {
    const isDataFormatted = validateArgs(
      data[i],
      ["value", "time", "noteLength"],
      "Please format your data with time, value, and noteLength keys"
    );
    if (!isDataFormatted) break;
    if (i === data.length - 1) break;

    const oscillator = this.context.createOscillator();
    var freq = this.pitches[data[i].value];
    var nextFreq = this.pitches[data[i + 1].value];
    var noteLength = data[i].noteLength;
    _createSound.apply(this, [freq, nextFreq, noteLength]);
  }
};

/**
 * stop
 * Calls internal _clearContext
 * @returns {void}
 */
Sonify.prototype.stop = function() {
  _clearContext.call(this);
};

module.exports = Sonify;
