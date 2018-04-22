import _ from "lodash";
import notes from "./notes";
import { validateArgs, percent } from "./helpers";

const MS_PER_YEAR = 31540000000;

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

Sonify.prototype._setContext = function() {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.currentTime = this.context.currentTime;
};

Sonify.prototype._clearContext = function() {
  if (this.context && this.context.state === "running") {
    this.context.close();
    this.currentTime = 0;
  }
};

Sonify.prototype.mapNodesToPitches = function(data, threshold) {
  const isDataFormatted = validateArgs(
    data,
    ["time", "value"],
    "Please format your data with a value and time key"
  );

  if (!isDataFormatted) return;

  const maxDataPoint = _.maxBy(data, "value").value;
  const minDataPoint = _.minBy(data, "value").value;
  return data.map(point => {
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

Sonify.prototype.mapTimeToNoteLength = function(data) {
  const isDataFormatted = validateArgs(
    data,
    ["time", "value"],
    "Please format your data with a value and time key"
  );

  if (!isDataFormatted) return;

  const startTime = _.minBy(data, "time").time; // 1518964287672 ms
  const endTime = _.maxBy(data, "time").time; // 1522174287672 ms
  const totalTimeMs = endTime - startTime; // 3210000000 ms
  const songLength = this.ms_per_songyear * totalTimeMs / MS_PER_YEAR; // 6107 ms
  const timedData = [];
  for (let i = 0; i < data.length; i++) {
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

Sonify.prototype._createSound = function(freq, nextFreq, noteLength) {
  console.log(freq, nextFreq, noteLength);
  const gainNode = this.context.createGain();
  gainNode.connect(this.context.destination);
  const oscillator = this.context.createOscillator();

  gainNode.gain.setValueAtTime(0.001, this.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.5,
    this.currentTime + noteLength / 8
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
};

Sonify.prototype.play = function(data) {
  const isDataFormatted = validateArgs(
    data,
    ["time", "value", "noteLength"],
    "Please format your data with time, value, and noteLength keys"
  );

  if (!isDataFormatted) return;

  if (this.context.state === "running") {
    this._clearContext();
  }

  this._setContext();

  for (var i = 0; i < data.length; i++) {
    if (i === data.length - 1) break;
    const oscillator = this.context.createOscillator();
    var freq = this.pitches[data[i].value];
    var nextFreq = this.pitches[data[i + 1].value];
    var noteLength = data[i].noteLength;
    console.log(
      "i:",
      i,
      data[i].value,
      "freq",
      freq,
      "nextFreq",
      nextFreq,
      "noteLength",
      noteLength
    );
    this._createSound(freq, nextFreq, noteLength);
  }
};

Sonify.prototype.stop = function() {
  this._clearContext();
};

module.exports = Sonify;

// Sonify.prototype.getPitches = function (octaves = 2) {
//   var noteNames = ["C", "D", "E", "F", "G", "A", "B"];
//   let pitches = [];
//   for (var i = 2; i < i + octaves; i++) {
//     for (var j = 0; j < noteNames.length; j++) {
//       console.log(notes[`${noteNames[j]}${i}`])
//       pitches.push(notes[`${noteNames[j]}${i}`])
//     }
//   }
//   this.pitches = pitches;
// };
