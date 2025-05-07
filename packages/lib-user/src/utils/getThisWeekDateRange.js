import { getStatsDateString } from '@utils'

/*
  Get today's date (UTC) for stats query
*/
function getThisWeekEndDate() {
  // Construct a new Javascript Date object
  const today = new Date()

  // .toISOString() in this function returns a UTC string like 2024-05-05
  return getStatsDateString(today)
}

/*
  Get this week's start date (UTC) for stats query
*/
function getThisWeekStartDate() {
  // Construct a new Javascript Date object
  const thisWeekStartDate = new Date()

  // .getUTCDate() returns numeric day of the month (UTC).
  // If a negative number is provided to .setUTCDate(), the date will be
  // set counting backwards from the last day of the previous month.
  const sevenDaysAgo = thisWeekStartDate.getUTCDate() - 6
  thisWeekStartDate.setUTCDate(sevenDaysAgo)

  // .toISOString() in this function returns a UTC string
  return getStatsDateString(thisWeekStartDate)
}

export function getThisWeekDateRange() {
  return {
    endDate: getThisWeekEndDate(),
    startDate: getThisWeekStartDate()
  }
}
