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
const Sonifier = new Sonify({
  data, 
  songLength: 10,
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

### Sonify constructor options

-------------------------------------------------------------------------------------------------------------------------------------- 

| Name         | Type                 | Sample Value                                 | Description                                                                                                                            | Default                                                           | Required |
| ------------ | -------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| data         | Array<Array<number>> | [[1586969694206, 2.3], [1596969695555, 5.3]] | Two dimensional array of data points                                                                                                   |                                                                   | yes      |
| songLength   | number               | 60                                           | Length of the generated song in seconds                                                                                                |                                                                   | yes      |
| pitches      | Array<string>        | ["A", "C#", "E"]                             | Array of pitch names to use. Default is all 12 chromatic notes                                                                         | ["C", "C#", "D", "D#", "E", "F", "Gb", "G", "A", "Ab", "Bb", "B"] | no       |
| octaveRange  | number               | 2                                            | Number of octaves that the song should span.                                                                                           | 3                                                                 | no       |
| baseOctave   | number               | 4                                            | Starting octave for the sonification. There are 9 octaves available, so `baseOctave` must be less than `9 - octaveRange`.              | 6                                                                 | no       |
| glissando    | boolean              | true                                         | Whether or not to glide from one pitch to another. With this option enabled you can clearly hear the shape of the data.                | false                                                             | no       |
| staticRhythm | boolean              | false                                        | Disregard timestamps and give each data point an equal note length by dividing the provided `songLength` by the number of data points. | false                                                             | no       |
| onEnded      | function             | () => console.log("That's all folks")        | Callback that is invoked when the song is finished playing                                                                             |                                                                   | no       | **** |

## Methods

--------------------------------------------------------------------------------------------------------------------------------------

### Sonify.prototype.play()

Initiates playback of the provided data

### Sonify.prototype.stop()

Stops playback and clears the web audio context
