import _ from "lodash";
import { percent, validateArgs } from "./helpers";
import notes from "./notes";

const MS_PER_YEAR = 31540000000;

/**
 * @class Sonify
 * @param {Array<Array<number>>} data - Two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]
 * @param {number} songLength - Length of the generated song in seconds
 * @param {Object} options
 * @param {number} options.octaves - Number of octaves that the song should span
 * @param {number} options.baseOctave - Base octave
 * @return {Sonify} - A Sonify object
 */
class Sonify {
  constructor(data, songLength, { octaves = 3, baseOctave = 6 }) {
    if (baseOctave + octaves > 9) {
      throw new Error("Base octave must be no more than 9 - octaves");
    }
    this.pitches = _.uniq(_.values(notes));
    this.maxPitch = octaves * 8 + baseOctave * 8;
    this.minPitch = baseOctave * 8;
    this.context = {};
    this.currentTime = 0;
    this.songLength = songLength;

    const transformedData = _transform.call(this, data);
    this.data = transformedData;
  }
}

function _transform(data) {
  // Sort data by timestamp
  data.sort(([a], [b]) => a - b);

  const pitchedData = _mapNodesToPitches.call(this, data);
  const timedData = _mapTimeToNoteLength.call(this, pitchedData);

  return timedData;
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
  // Schedule the current frequency
  this.oscillator.frequency.setValueAtTime(freq, this.currentTime);

  // Schedule a gradual, linear change in frequency from the current
  // pitch to the next that spans the noteLength value
  this.oscillator.frequency.linearRampToValueAtTime(
    nextFreq,
    this.currentTime + noteLength
  );

  // Move the currentTime forward
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
function _mapNodesToPitches(data) {
  const minDataPoint = _.minBy(data, x => x[1])[1];
  const maxDataPoint = _.maxBy(data, x => x[1])[1];

  return data.map(point => {
    const percent = (point[1] - minDataPoint) / (maxDataPoint - minDataPoint);
    return [
      point[0],
      Math.round(percent * (this.maxPitch - this.minPitch) + this.minPitch)
    ];
  });
}

/**
 * Take an array of data point objects with the keys "time" and "value" and
 * return a transformed object with a "noteLength" property that represents
 * a note length in seconds
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point
 * @param {string} data[].time - Unix timestamp value
 * @return {Array<Object>} - An array of data point objects
 */
function _mapTimeToNoteLength(data) {
  const startTime = data[0][0];
  const endTime = data[data.length - 1][0];
  const totalTime = endTime - startTime;
  const songLength = this.songLength;
  const timedData = [];

  for (let i = 0; i < data.length; i++) {
    if (i !== data.length - 1) {
      // if we're not on the last loop
      let current = data[i][0];
      let next = data[i + 1][0];
      let currentPointInSong =
        percent(current, startTime, totalTime) * songLength;
      let nextPointInSong = percent(next, startTime, totalTime) * songLength;
      let noteLengthSecs = nextPointInSong - currentPointInSong;
      timedData.push({ ...data[i], noteLength: noteLengthSecs });
    } else {
      timedData.push({ ...data[i], noteLength: 0 });
    }
  }
  return timedData;
}

/**
 * Maps through data with keys "value", "time", and "noteLength", and
 * calls this._createSound to create the appropriate nodes
 * @param {Array<Object>} data - An array of data point objects
 * @param {string} data[].value - Integer value of the data point representing a pitch
 * @param {string} data[].time - Unix timestamp value
 * @param {string} data[].noteLength - Interger value that represents a note length in beats per second
 * @returns {void}
 */
Sonify.prototype.play = function() {
  if (this.context.state === "running") {
    _clearContext.call(this);
  }

  // Create the audio context
  _setContext.call(this);

  // Create gain and oscillator nodes
  this.gainNode = this.context.createGain();
  this.oscillator = this.context.createOscillator();

  // Connect the oscillator and gain to the context destination
  this.oscillator.connect(this.gainNode);
  this.gainNode.connect(this.context.destination);

  // Start the oscillator node
  this.oscillator.start(this.currentTime);

  let noteLength, freq, nextFreq;

  for (let i = 0; i < this.data.length; i++) {
    if (i === this.data.length - 1) break;
    freq = this.pitches[this.data[i][1]];
    nextFreq = this.pitches[this.data[i + 1][1]];
    noteLength = this.data[i].noteLength;
    _createSound.apply(this, [freq, nextFreq, noteLength]);
  }

  this.oscillator.stop(this.currentTime);
};

/**
 * Calls internal _clearContext
 * @returns {void}
 */
Sonify.prototype.stop = function() {
  _clearContext.call(this);
};

export default Sonify;
