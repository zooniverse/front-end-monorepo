/* Today in UTC */
export function getTodayDateString() {
  const today = new Date()
  return today.toISOString().substring(0, 10)
}

export function getNumDaysAgoDateString(numOfDays) {
  const daysAgoDate = new Date()
  const daysAgo = daysAgoDate.getUTCDate() - numOfDays
  daysAgoDate.setUTCDate(daysAgo)
  return daysAgoDate.toISOString().substring(0, 10)
}

export function getQueryPeriod(endDate, startDate) {
  const differenceInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)

  if (differenceInDays <= 31) return 'day'
  else if (differenceInDays <= 183) return 'week'
  else if (differenceInDays <= 1460) return 'month'
  else return 'year'
}
