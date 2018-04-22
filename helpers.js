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

module.exports = { validateArgs, percent };
