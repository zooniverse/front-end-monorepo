import { getStatsDateString } from '@utils'

export function getDateInterval({ endDate, startDate }) {
  const today = new Date()
  const todayUTC = getStatsDateString(today)
  const end_date = endDate ? endDate : todayUTC
  const defaultStartDate = new Date()
  defaultStartDate.setUTCDate(today.getUTCDate() - 6)
  const start_date = startDate ? startDate : getStatsDateString(defaultStartDate)

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
