import { uniq, values, maxBy, minBy } from "lodash/fp";

import { percent, _validate, _format } from "./helpers";
import notes from "./notes";

/**
 * @class Sonify
 * @param {Array<Array<number>>} data - Two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]
 * @param {number} songLength - Length of the generated song in seconds
 * @param {Object} options
 * @param {Array<string>} options.pitches - Array of pitch names to use, e.g. ["C", "D", "E", "F", "G", "A", "B"]
 * @param {number} options.octaves - Number of octaves that the song should span
 * @param {number} options.baseOctave - Base octave
 * @param {boolean} options.glissando - Whether pitches should glide seamlessly from one to another
 * @param {boolean} options.staticRhythm - Do not calculate rhythm based on timestamps, and instead equally divide pitches into the specified songLength
 * @return {Sonify} - A Sonify object
 */
class Sonify {
  constructor(data, songLength, options) {
    const {
      pitches = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "Gb",
        "G",
        "A",
        "Ab",
        "Bb",
        "B"
      ],
      octaves = 2,
      baseOctave = 3,
      glissando = false,
      staticRhythm = false
    } =
      options || {};

    _validate(data, songLength, pitches, octaves, baseOctave);

    this.pitches = Object.keys(notes)
      .filter(note => {
        return pitches.includes(note.replace(/\d/g, ""));
      })
      .map(pitchName => notes[pitchName]);
    this.minPitch = baseOctave * pitches.length;
    this.maxPitch = octaves * pitches.length + this.minPitch;
    this.context = {};
    this.currentTime = 0;
    this.isPlaying = false;
    this.glissando = glissando;
    this.staticRhythm = staticRhythm;
    this.songLength = songLength;
    this.data = _transform.call(this, data);
  }
}

/**
 * Sorts data and calls _mapNodesToPitches and _mapTimeToNoteLength to transform the
 * data into something we can play using the web audio api.
 * @param {Array<Array<number>>} data - Two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]
 * @return {Array<Object>} - An array of objects with the form [{ pitch: 45, noteLength: 0.47312324 }]
 */
function _transform(data) {
  // Sort data by timestamp
  data.sort(([a], [b]) => a - b);

  const pitchedData = _mapNodesToPitches.call(this, data);
  const timedData = _mapTimeToNoteLength.call(this, pitchedData);

  return _format(timedData);
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
 * mapNodesToPitches
 * Take an array of data point objects and return a transformed object
 * with the 2nd index representing a pitch within the given octave range
 * @param {Array<Array<number>>} data - A sorted two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]
 * @return {Array<Array<number>>}  - A transformed two dimensional array, where the first index now represents a pitch value
 */
function _mapNodesToPitches(data) {
  const minDataPoint = minBy(x => x[1], data)[1];
  const maxDataPoint = maxBy(x => x[1], data)[1];

  return data.map(point => {
    const factor = percent(point[1], minDataPoint, maxDataPoint - minDataPoint);
    return [
      point[0],
      Math.round(factor * (this.maxPitch - this.minPitch) + this.minPitch)
    ];
  });
}

/**
 * Takes a two-dimensional array of data points and returns a transformed array
 * where the 2nd index represents a given note length in seconds
 * @param {Array<Array<number>>} data - A sorted two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]
 * @return {Array<Array<number>>}  - A transformed two dimensional array, where the second index now represents note length in seconds
 */
function _mapTimeToNoteLength(data) {
  const earliestTS = data[0][0];
  const latestTS = data[data.length - 1][0];
  const domain = latestTS - earliestTS;

  return data.map((point, i) => {
    if (i !== data.length - 1) {
      const currentPointInSong =
        percent(point[0], earliestTS, domain) * this.songLength;
      const nextPointInSong =
        percent(data[i + 1][0], earliestTS, domain) * this.songLength;

      // If the rhythm is static, just divide total seconds by the number of data points
      const noteLengthSecs = this.staticRhythm
        ? this.songLength / data.length
        : nextPointInSong - currentPointInSong;

      return [...point, noteLengthSecs];
    } else {
      return [...point, this.staticRhythm ? this.songLength / data.length : 0];
    }
  });
}

/**
 * Takes two frequencies and a note length (in beats) and
 * creates a gain and oscillator node.
 * @param {number} freq - A float representing the frequency (pitch) of a given note
 * @param {number} nextFreq - A float representing the frequency (pitch) of the next note in the song
 * @param {number} noteLength - A float representing the note length in seconds
 * @return {void}
 */
function _createSound(freq, nextFreq, noteLength) {
  // Schedule the current frequency
  this.oscillator.frequency.setValueAtTime(freq, this.currentTime);
  this.gainNode.gain.setTargetAtTime(1, this.currentTime, 0.015);

  if (this.glissando) {
    // Schedule a gradual, exponential change in frequency from the current
    // pitch to the next that spans the noteLength value
    this.oscillator.frequency.exponentialRampToValueAtTime(
      nextFreq,
      this.currentTime + noteLength
    );
  } else {
    // If glissando is false, then we want to add a slight space between each
    // note so we can differentiate the data points
    this.gainNode.gain.setTargetAtTime(
      0,
      this.currentTime + noteLength - noteLength / this.songLength,
      0.015
    );
  }

  // Move the currentTime forward
  this.currentTime += noteLength;
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

  this.isPlaying = true;

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
    nextFreq = this.pitches[this.data[i + 1].pitch];
    freq = this.pitches[this.data[i].pitch];

    // Call create sound with frequencies and note length
    _createSound.call(this, freq, nextFreq, this.data[i].noteLength);
  }

  this.oscillator.stop(this.currentTime);
  this.isPlaying = false;
};

/**
 * Clears the audio context
 * @returns {void}
 */
Sonify.prototype.stop = function() {
  _clearContext.call(this);
  this.isPlaying = false;
};

export default Sonify;
