function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

function getPeriodFromDateDifference(difference) {
  if (difference <= 31) {
    return 'day'
  } else if (difference <= 183) {
    return 'week'
  } else {
    return 'month'
  }
}

export default function getDateInterval(dateRange) {
  const endDate = new Date()
  const end_date = endDate.toISOString().substring(0, 10)
  
  let startDate = new Date(new Date().setDate(endDate.getDate() - 6))
  let start_date = startDate.toISOString().substring(0, 10)
  
  let period = 'day'
  
  if (dateRange === 'Last7Days') {
    return {
      end_date,
      period,
      start_date
    }
  } else if (dateRange === 'Last30Days') {
    startDate = new Date(new Date().setDate(endDate.getDate() - 29))
    start_date = startDate.toISOString().substring(0, 10)
    return {
      end_date,
      period,
      start_date
    }
  } else if (dateRange === 'ThisMonth') {
    startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
    start_date = startDate.toISOString().substring(0, 10)
    return {
      end_date,
      period,
      start_date
    }
  } else if (dateRange === 'Last3Months') {
    startDate = new Date(new Date().setDate(endDate.getDate() - 90))
    start_date = startDate.toISOString().substring(0, 10)
    return {
      end_date,
      period: 'week',
      start_date
    }
  } else if (dateRange === 'ThisYear') {
    startDate = new Date(endDate.getFullYear(), 0, 1)
    start_date = startDate.toISOString().substring(0, 10)
    const difference = (endDate - startDate) / (1000 * 60 * 60 * 24)
    period = getPeriodFromDateDifference(difference)
    return {
      end_date,
      period,
      start_date
    }
  } else if (dateRange === 'Last12Months') {
    startDate = new Date((endDate.getFullYear() - 1), getNextMonth(endDate.getMonth()), 1)
    start_date = startDate.toISOString().substring(0, 10)
    return {
      end_date,
      period: 'month',
      start_date
    }
  } else if (dateRange === 'AllTime') {
    return {
      period: 'year'
    }
  } else {
    return {
      end_date,
      period,
      start_date
    }
  }
}
