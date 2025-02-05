/*
  Stats dates are always handled in UTC strings such as 24-09-23.
*/

export function getStatsDateString(date) {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10) // .toISOString returns UTC
  } else {
    return date?.substring(0, 10)
  }
}
