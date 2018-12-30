function percent(point, startTime, totalTime) {
  return (point - startTime) / totalTime;
}

function validateArgs(dataPoint, properties, errMsg) {
  const isDataValid = properties.every(prop => dataPoint.hasOwnProperty(prop));
  if (!isDataValid) {
    throw new Error(errMsg);
    return false;
  }
  return true;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

function _validate(data, songLength, options) {
  const isDataValid = data.every(([timestamp, value]) => {
    return isValidTimestamp(timestamp) && isNumeric(value);
  });

  if (!isDataValid) {
    throw new Error(
      "Please format your data as a two-dimensional array of unix timestamps and numeric values, e.g. [[1586969694206, 2.3], [1596969695555, 5.3]]"
    );
  }
  if (!songLength || typeof songLength !== "number") {
    throw new Error("Please provide a song length in seconds");
  }
  if (options && options.baseOctave + options.octaves > 9) {
    throw new Error("Base octave must be no more than 9 - octaves");
  }
}

export { _validate, percent };
