# Sonify

A module that allows you to sonify timeseries data. The Sonify class will scale your data to a given pitch range and song length, and then allow you play it in the browser using the Web Audio API.

The duration of a note is calculated by measuring the time between two data points. This is then scaled to the timeframe provided by `songLength`. You can optionally set `staticRythm: true` to disregard timestamps and give each data point an equal note length.

## Usage

```javascript
import Sonify from "sonify";

const data = [
  [1536969666906, 1],
  [1546969674206, 2],
  [1556966695555, 4.3],
  [1566959697655, 2.3],
  [1576669693906, 3]
];

// Instantiate a new Sonify instance with our data,
// with a song length of 10 seconds. Resulting pitches
// should span 3 octaves, starting from C06.
const Sonifier = new Sonify(data, 10, {
  octaves: 3,
  baseOctave: 6,
  glissando: true,
  staticRhythm: false,
  onEnded: () => console.log("that's all folks!")
});

Sonifier.play();

console.log(Sonifier.isPlaying); // true

Sonifier.stop();
```

## API

### Sonify class

{Array<Array<number>>} **data** _required_ - Two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]

{number} **songLength** _required_ - Length of the generated song in seconds

{Object} **options**

{Array<string>} **options.pitches** _default: ["C", "C#", "D", "D#", "E", "F", "Gb", "G", "A", "Ab", "Bb", "B"]_ - Array of pitch names to use, e.g. ["A", "C#", "E"]. Default is all 12 chromatic notes.

{number} **options.octaves** _default: 3_ - Number of octaves that the song should span.

{number} **options.baseOctave** _default: 6_ - Base octave to start from. There are 9 octaves available, so whatever you set as the base octave must be less than `9 - octaves`, or else you'll be out of range.

{number} **options.glissando** _default: false_ - Glide from one pitch to another. With this option enabled you can clearly hear the shape of the data.

{number} **options.staticRhythm** _default: false_ - Disregard timestamps and give each data point an equal note length by dividing the provided songLength by the number of data points.

{function} **options.onEnded** - Callback that is invoked when the song is finished playing

### Sonify.prototype.play()

returns {void}

### Sonify.prototype.stop()

returns {void}
