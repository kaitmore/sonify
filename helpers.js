function percent(point, startTime, totalTime) {
  return (point - startTime) / totalTime;
}

function validateArgs(data, argArray, errMsg) {
  const isDataFormatted = argArray.every((k, i) => {
    return k in data[i];
  });

  if (!isDataFormatted) {
    throw new Error(errMsg);
    return false;
  }
  return true;
}

module.exports = { validateArgs, percent };
