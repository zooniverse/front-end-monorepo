const DEFAULT_HANDLER = (key) => key

export default function getDateRangeLabel(dateInterval, t = DEFAULT_HANDLER) {
  const { end_date, start_date } = dateInterval
  const differenceInDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  const sameMonth = new Date(end_date).getUTCMonth() === new Date(start_date).getUTCMonth()
  const sameYear = new Date(end_date).getUTCFullYear() === new Date(start_date).getUTCFullYear()

  if (differenceInDays <= 7) {
    return {
      countLabel: t('BarChart.day'),
      time: 60,
      timeLabel: t('BarChart.minAbbrev'),
      tLDS: { timeZone: 'UTC', weekday: 'short' }
    }
  } else if (differenceInDays <= 30 && !sameMonth) {
    return {
      countLabel: t('BarChart.day'),
      time: 60,
      timeLabel: t('BarChart.minAbbrev'),
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 31 && sameMonth) {
    return {
      countLabel: t('BarChart.day'),
      time: 60,
      timeLabel: t('BarChart.minAbbrev'),
      tLDS: { timeZone: 'UTC', day: 'numeric' }
    }
  } else if (differenceInDays <= 183) {
    return {
      countLabel: t('BarChart.weekOf'),
      time: 3600,
      timeLabel: t('BarChart.hourAbbrev'),
      tLDS: { timeZone: 'UTC',  month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 365 && sameYear) {
    return {
      countLabel: t('BarChart.monthOf'),
      time: 3600,
      timeLabel: t('BarChart.hourAbbrev'),
      tLDS: { timeZone: 'UTC', month: 'short' }
    }
  } else if (differenceInDays <= 365) {
    return {
      countLabel: t('BarChart.monthOf'),
      time: 3600,
      timeLabel: t('BarChart.hourAbbrev'),
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else if (differenceInDays <= 1460) {
    return {
      countLabel: t('BarChart.monthOf'),
      time: 3600,
      timeLabel: t('BarChart.hourAbbrev'),
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else {
    return {
      countLabel: t('BarChart.year'),
      time: 3600,
      timeLabel: t('BarChart.hourAbbrev'),
      tLDS: { timeZone: 'UTC', year: 'numeric' }
    }
  }
}
