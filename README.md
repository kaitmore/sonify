# Sonify

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

{Array<Array<number>>} **data** - Two dimensional array of data points, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]], required

{number} **songLength** - Length of the generated song in seconds (required)

{Object} **options**

{number} **options.octaves** - Number of octaves that the song should span

{number} **options.baseOctave** - Base octave

### Sonify.prototype.play()

returns {void}

### Sonify.prototype.stop()

returns {void}
