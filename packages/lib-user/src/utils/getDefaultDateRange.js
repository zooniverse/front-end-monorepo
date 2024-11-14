import { getStatsDateString } from '@utils'

/*
  Get the default end date (UTC) for stats query
*/
function getDefaultEndDate() {
  // Construct a new Javascript Date object
  const today = new Date()

  // .toISOString() in this function returns a UTC string like 2024-05-05
  return getStatsDateString(today)
}

/*
  Get the default start date (UTC) for stats query
*/
function getDefaultStartDate() {
  // Construct a new Javascript Date object
  const defaultStartDate = new Date()

  // .getUTCDate() returns numeric day of the month (UTC).
  // If a negative number is provided to .setUTCDate(), the date will be
  // set counting backwards from the last day of the previous month.
  const sevenDaysAgo = defaultStartDate.getUTCDate() - 6
  defaultStartDate.setUTCDate(sevenDaysAgo)

  // .toISOString() in this function returns a UTC string
  return getStatsDateString(defaultStartDate)
}

export function getDefaultDateRange() {
  return {
    endDate: getDefaultEndDate(),
    startDate: getDefaultStartDate()
  }
}
