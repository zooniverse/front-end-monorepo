export default function getDateRangeLabel(dateInterval) {
  const { end_date, start_date } = dateInterval
  const differenceInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  const sameMonth = new Date(end_date).getUTCMonth() === new Date(start_date).getUTCMonth()
  const sameYear = new Date(end_date).getUTCFullYear() === new Date(start_date).getUTCFullYear()

  if (differenceInDays <= 7) {
    return {
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', weekday: 'short' }
    }
  } else if (differenceInDays <= 30 && !sameMonth) {
    return { 
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 31 && sameMonth) {
    return { 
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', day: 'numeric' }
    }
  } else if (differenceInDays <= 183) {
    return {
      countLabel: 'Week of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC',  month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 365 && sameYear) {
    return {
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'short' }
    }
  } else if (differenceInDays <= 365) {
    return {
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else if (differenceInDays <= 1460) {
    return {
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else {
    return {
      countLabel: 'Year',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', year: 'numeric' }
    }
  }
}
