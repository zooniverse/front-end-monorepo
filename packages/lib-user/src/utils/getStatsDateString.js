// The defaultDate default value is set to '2015-03-17' because that is the earliest classification date in ERAS.

export const STATS_START_DATE = '2015-03-17'

export function getStatsDateString(date, defaultDate = STATS_START_DATE) {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10)
  } else if (typeof date === 'string') {
    return date.substring(0, 10)
  } else {
    return defaultDate
  }
}
