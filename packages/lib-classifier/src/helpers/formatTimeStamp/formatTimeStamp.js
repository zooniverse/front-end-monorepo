function formatTimeStamp(displayTime, duration) {
  // timeStamp is in seconds
  const timeStamp = duration ? displayTime * duration : displayTime

  if (timeStamp < 1) {
    return '0:00'
  }

  let date
  date = new Date(timeStamp * 1000).toISOString().substring(14, 19)
  date.replace('.', ':')
  if (date.slice(0, 2) === '00') {
    date = date.slice(1)
  }
  return date
}

export default formatTimeStamp
