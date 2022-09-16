function formatTimeStamp(displayTime, duration) {
  // timeStamp is in seconds
  const timeStamp = duration ? displayTime * duration : displayTime

  let date

  if (timeStamp < 60) {
    // timestamp is less than 1 minute (mm.ss)
    date = new Date(timeStamp * 1000).toISOString().substring(14, 19)
  } else if (timeStamp < 3600) {
    // or timestamp is less than 1 hour (hh.mm)
    date = new Date(timeStamp * 1000).toISOString().substring(11, 16)
  }
  const formattedTimeStamp = date.replace('.', ':')
  return formattedTimeStamp
}

export default formatTimeStamp
