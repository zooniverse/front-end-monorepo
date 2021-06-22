function formatTimeStamp(displayTime, duration) {
  const currentVideoTime = duration ? displayTime * duration : displayTime

  const pad = (string, digits) =>
    ('0'.repeat(digits - 1) + string).slice(-digits)

  const date = new Date(currentVideoTime * 1000)
  const mm = pad(date.getUTCMinutes(), 2)
  const ss = pad(date.getUTCSeconds(), 2)
  const ms = pad(date.getUTCMilliseconds(), 3)
  if (mm > 0) {
    return `${mm}:${ss}:${ms}`
  }
  return `${ss}:${ms}`
}

export default formatTimeStamp
