function padSeconds(string) {
  return ('0' + string).slice(-2)
}

function formatTimeStamp(played, duration) {
  // timeStamp is in seconds
  const timeStamp = duration ? played * duration : played

  if (typeof timeStamp !== 'number' || isNaN(timeStamp)) {
    return 'NaN'
  }

  if (timeStamp < 1) {
    return '0:00'
  }

  const date = new Date(timeStamp * 1000)
  const mm = date.getUTCMinutes()
  const ss = padSeconds(date.getUTCSeconds())
  return `${mm}:${ss}`
}

export default formatTimeStamp
