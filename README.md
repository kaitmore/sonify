# Sonify

## Usage

```javascript
import Sonify from "sonify";

const Sonifier = new Sonify(5, 3, 6);

const rawData = [ 
    { time: 1536969693906, value: 1 }, 
    { time: 1536969694206, value: 2 }, 
    { time: 1536969695555, value: 4.3 }, 
    { time: 1536969697655, value: 2.3 }
]

const pitches = Sonifier.mapNodesToPitches(rawData)

const timedData = Sonifier.mapTimeToNoteLength(pitches);

Sonifier.play(timedData)
```

## API

### Sonify

* @param {number}  **secPerSongYear** - Number of seconds to represent each year in the source data
* @param {number}  **octaves** - Number of octaves that the song should span
* @param {number}  **baseOctave** - Base octave

### Sonify.prototype.mapNodesToPitches
Take an array of data point objects with the keys "time" and "value" and return a transformed object with a "value" property representing a pitch within the given octave range

* @param {Array<Object>} **data** An array of data point objects
* @param {string} **data[].value** Integer value of the data point
* @param {string} **data[].time** Unix timestamp value
* @return {Array<Object>} An array of data point objects

### Sonify.prototype.mapTimeToNoteLength

Take an array of data point objects with the keys "time" and "value" and return a transformed object with a "noteLength" property that represents a note length in seconds
* @param {Array<Object>}  **data** - An array of data point objects
* @param {string} data[].value - Integer value of the data point
* @param {string} data[].time - Unix timestamp value
* @return {Array<Object>} - An array of data point objects

### Sonify.prototype.play
* @param {Array<Object>} **data** - An array of data point objects
* @param {string} data[].value - Integer value of the data point representing a pitch
* @param {string} data[].time - Unix timestamp value
* @param {string} data[].noteLength - Interger value that represents a note length in beats per second
* @returns {void}