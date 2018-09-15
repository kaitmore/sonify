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
{number} **secPerSongYear** - Number of seconds to represent each year in the source data

{number} **octaves** - Number of octaves that the song should span

{number} **baseOctave** - Base octave

### Sonify.prototype.mapNodesToPitches
Take an array of data point objects with the keys "time" and "value" and return a transformed object with a "value" property representing a pitch within the given octave range

{Array<Object>} **data** - An array of data point objects

{string} **data[].value** - Integer value of the data point

{string} **data[].time** - Unix timestamp value

returns {Array<Object>} - An array of data point objects

### Sonify.prototype.mapTimeToNoteLength

Take an array of data point objects with the keys "time" and "value" and return a transformed object with a "noteLength" property that represents a note length in seconds

{Array<Object>}  **data** - An array of data point objects

{string} **data[].value** - Integer value of the data point

{string} **data[].time** - Unix timestamp value

returns {Array<Object>} - An array of data point objects

### Sonify.prototype.play
{Array<Object>} **data** - An array of data point objects

{string} **data[].value** - Integer value of the data point representing a pitch

{string} **data[].time** - Unix timestamp value

{string} **data[].noteLength** - Interger value that represents a note length in beats per second

returns {void}