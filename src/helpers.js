const VALID_OCTAVES = 8;

function percent(point, startTime, totalTime) {
  return (point - startTime) / totalTime;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

function _validate(data, songLength, pitches, octaves, baseOctave) {
  const totalNotes = pitches.length * VALID_OCTAVES;

  const isRangeValid =
    octaves * pitches.length + baseOctave * pitches.length < totalNotes;

  const isDataValid =
    Array.isArray(data) &&
    data.every(point => {
      return (
        Array.isArray(point) &&
        isValidTimestamp(point[0]) &&
        isNumeric(point[1])
      );
    });

  if (!isDataValid) {
    throw new Error(
      "Please format your data as a two-dimensional array of unix timestamps and numeric values, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]"
    );
  }
  if (!isRangeValid) {
    throw new Error(
      "Invalid Range. Please choose a lower base octave or a smaller octave range."
    );
  }
  if (!songLength || typeof songLength !== "number") {
    throw new Error("Please provide a song length in seconds");
  }
  if (baseOctave + octaves > 9) {
    throw new Error("Base octave must be no more than 9 - octaves");
  }
}

function _format(data) {
  return data.map(([, pitch, noteLength]) => ({
    pitch,
    noteLength
  }));
}

export { _validate, percent, _format };
