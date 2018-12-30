# Sonify

A module that allows you to sonify timeseries data. The sonify class will scale your data to a given pitch range and song length, and then allow you play it in the browser using the Web Audio API.

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
// should span 3 octaves, starting from the 6th octave
const Sonifier = new Sonify(data, 10, {
  octaves: 3,
  baseOctave: 6
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

{number} **options.octaves** _default: 3_ - Number of octaves that the song should span

{number} **options.baseOctave** _default: 6_ - Base octave

### Sonify.prototype.play()

returns {void}

### Sonify.prototype.stop()

returns {void}
