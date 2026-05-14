export default function getStatsDateString(date) {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10) // .toISOString returns UTC
  } else {
    return date?.substring(0, 10)
  }
}
