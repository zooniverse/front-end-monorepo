/*
  ERAS accepts queries in time interval "buckets" of day, week, month, or year.
*/
function getInterval(differenceInDays) {
  if (differenceInDays <= 31) {
    return 'day'
  }

  if (differenceInDays <= 183) {
    return 'week'
  }

  if (differenceInDays <= 1460) {
    return 'month'
  }

  return 'year'
}

export function getDateInterval({ endDate, startDate }) {
  // Get new Date timestamps based on UTC strings, and then convert from ms to days.
  const differenceInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)

  return {
    end_date: endDate,
    period: getInterval(differenceInDays),
    start_date: startDate
  }
}
