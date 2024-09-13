export function getStatsDateString(date) {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10)
  } else {
    return date?.substring(0, 10)
  }
}
