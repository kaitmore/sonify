import _ from "lodash";
import { percent, validateArgs } from "./helpers";
import notes from "./notes";
const MS_PER_YEAR = 31540000000;

/**
 * @class Sonify
 * @param {number} secPerSongYear - Number of seconds to represent each year in the source data
 * @param {number} octaves - Number of octaves that the song should span
 * @param {number} baseOctave - Base octave
 * @return {Sonify} - A Sonify object
 */
class Sonify {
  constructor(secPerSongYear = 5, octaves = 3, baseOctave = 6) {
    if (baseOctave + octaves > 9) {
      throw new Error("Base octave must be no more than 9 - octaves");
    }
    this.pitches = _.uniq(_.values(notes));
    this.maxPitch = octaves * 8 + baseOctave * 8;
    this.minPitch = baseOctave * 8;
    this.context = {};
    this.currentTime = 0;
    this.secPerSongYear = secPerSongYear;
  }
}

/**
 * Creates a new web audio context in the window and sets currentTime
 * equal to the newly created context's currentTime
 * @return {void}
 */
function _setContext() {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.currentTime = this.context.currentTime;
}

/**
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
 * Takes two frequencies and a note length (in beats) and
 * creates a gain and oscillator node.
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
function _createSound(freq, nextFreq, noteLength) {
  this.gainNode.gain.setTargetAtTime(1, this.currentTime, 0.00015);

  this.oscillator.frequency.setValueAtTime(freq, this.currentTime);

  this.oscillator.frequency.linearRampToValueAtTime(
    nextFreq,
    this.currentTime + noteLength
  );
  this.gainNode.gain.setTargetAtTime(0, this.currentTime + noteLength, 0.00015);

  this.currentTime += noteLength;
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
 * Take an array of data point objects with the keys "time" and "value" and
 * return a transformed object with a "noteLength" property that represents
 * a note length in seconds
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
Sonify.prototype.mapTimeToNoteLength = function(data) {
  const startTime = _.minBy(data, "time").time * 1000;
  const endTime = _.maxBy(data, "time").time * 1000;
  const totalTime = endTime - startTime;
  const songLength = this.secPerSongYear * totalTime / MS_PER_YEAR;
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
        percent(current, startTime, totalTime) * songLength;
      let nextPointInSong = percent(next, startTime, totalTime) * songLength;
      let noteLengthSecs = nextPointInSong - currentPointInSong;
      timedData.push({ ...data[i], noteLength: noteLengthSecs });
    } else {
      timedData.push({ ...data[i], noteLength: 1 });
    }
  }
  return timedData;
};

/**
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

  this.gainNode = this.context.createGain();
  this.oscillator = this.context.createOscillator();
  this.oscillator.connect(this.gainNode);
  this.gainNode.connect(this.context.destination);
  this.oscillator.start(this.currentTime);

  for (var i = 0; i < data.length; i++) {
    const isDataFormatted = validateArgs(
      data[i],
      ["value", "time", "noteLength"],
      "Please format your data with time, value, and noteLength keys"
    );
    if (!isDataFormatted) break;
    if (i === data.length - 1) break;
    const freq = this.pitches[data[i].value];
    const nextFreq = this.pitches[data[i + 1].value];
    const noteLength = data[i].noteLength;
    _createSound.apply(this, [freq, nextFreq, noteLength]);
  }
};

/**
 * Calls internal _clearContext
 * @returns {void}
 */
Sonify.prototype.stop = function() {
  _clearContext.call(this);
};

module.exports = Sonify;
