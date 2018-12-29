import _ from "lodash";
import { percent, validateArgs } from "./helpers";
import notes from "./notes";

const pitches = _.uniq(_.values(notes));

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
  const transformedData = _format(timedData);
  console.log(transformedData);
  return transformedData;
}

function _format(data) {
  return data.map(([, pitch, noteLength]) => ({
    pitch,
    noteLength
  }));
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
    const factor = percent(point[1], minDataPoint, maxDataPoint - minDataPoint);
    return [
      point[0],
      Math.round(factor * (this.maxPitch - this.minPitch) + this.minPitch)
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

  return data.map((point, i) => {
    if (i !== data.length - 1) {
      let currentTimestamp = point[0];
      let nextTimestamp = data[i + 1][0];
      let currentPointInSong =
        percent(currentTimestamp, startTime, totalTime) * this.songLength;
      let nextPointInSong =
        percent(nextTimestamp, startTime, totalTime) * this.songLength;
      let noteLengthSecs = nextPointInSong - currentPointInSong;
      return [...point, noteLengthSecs];
    } else {
      return [...point, 0];
    }
  });
}

/**
 * Creates the audio context and necessary nodes. Maps through this.data and
 * calls this._createSound to schedule and play the appropriate notes
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

  let freq, nextFreq;

  for (let i = 0; i < this.data.length; i++) {
    // If we're on the last data point, exit the loop
    if (i === this.data.length - 1) break;

    // Lookup frequencies using the pitch number
    freq = pitches[this.data[i].pitch];
    nextFreq = pitches[this.data[i + 1].pitch];

    // Call create sound with frequencies and note length
    _createSound.call(this, freq, nextFreq, this.data[i].noteLength);
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
