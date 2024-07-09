export function getDateInterval({ endDate, startDate }) {
  const today = new Date()
  const todayUTC = today.toISOString().substring(0, 10)
  const end_date = endDate ? endDate : todayUTC
  const start_date = startDate ? startDate : today.setUTCDate(today.getUTCDate() - 6).toISOString().substring(0, 10)

  const differenceInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)

  if (differenceInDays <= 31) {
    return {
      end_date,
      period: 'day',
      start_date
    }
  }

  if (differenceInDays <= 183) {
    return {
      end_date,
      period: 'week',
      start_date
    }
  }

  if (differenceInDays <= 1460) {
    return {
      end_date,
      period: 'month',
      start_date
    }
  }

  return {
    end_date,
    period: 'year',
    start_date
  }  
}
