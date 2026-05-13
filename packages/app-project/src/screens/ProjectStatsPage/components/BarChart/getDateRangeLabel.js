/** Same helper function as lib-user's BarChart, but labels here are using Intl API instead of i18n translations */

export default function getDateRangeLabel(dateInterval, locale) {
  const { end_date, start_date } = dateInterval
  const differenceInDays =
    (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  const sameMonth =
    new Date(end_date).getUTCMonth() === new Date(start_date).getUTCMonth()
  const sameYear =
    new Date(end_date).getUTCFullYear() ===
    new Date(start_date).getUTCFullYear()

  const displayNames = new Intl.DisplayNames([locale], {
    type: 'dateTimeField'
  })

  if (differenceInDays <= 7) {
    return {
      countLabel: displayNames.of('day'),
      time: 60,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', weekday: 'short' }
    }
  } else if (differenceInDays <= 30 && !sameMonth) {
    return {
      countLabel: displayNames.of('day'),
      time: 60,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 31 && sameMonth) {
    return {
      countLabel: displayNames.of('day'),
      time: 60,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', day: 'numeric' }
    }
  } else if (differenceInDays <= 183) {
    return {
      countLabel: displayNames.of('weekOfYear'),
      time: 3600,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    }
  } else if (differenceInDays <= 365 && sameYear) {
    return {
      countLabel: displayNames.of('month'),
      time: 3600,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', month: 'short' }
    }
  } else if (differenceInDays <= 365) {
    return {
      countLabel: displayNames.of('month'),
      time: 3600,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else if (differenceInDays <= 1460) {
    return {
      countLabel: displayNames.of('month'),
      time: 3600,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    }
  } else {
    return {
      countLabel: displayNames.of('year'),
      time: 3600,
      // commentsLabel: '',
      tLDS: { timeZone: 'UTC', year: 'numeric' }
    }
  }
}
