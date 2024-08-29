function validateDate({ date, dateKey }) {
  // if date is undefined, return undefined
  if (date === undefined) {
    return { date }
  }
  // date per search param should be a string
  if (typeof date !== 'string') {
    return {
      date: null,
      message: `Invalid ${dateKey}, must be a string`
    }
  }
  // date should be in the format 'YYYY-MM-DD'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return {
      date: null,
      message: `Invalid ${dateKey}, must be in the format YYYY-MM-DD`
    }
  }
  // return valid date
  return { date }
}

export function validateDateRangeParams({ endDate, startDate }) {
  const { date: validEndDate, message: endDateMessage } = validateDate({ date: endDate, dateKey: 'end_date' })
  const { date: validStartDate, message: startDateMessage } = validateDate({ date: startDate, dateKey: 'start_date' })

  let dateRangeMessage = [endDateMessage, startDateMessage]
    .filter(message => message)
    .join(', ')
  
  // check valid start date is before valid end date
  if (validStartDate && validEndDate) {
    if (validStartDate > validEndDate) {
      dateRangeMessage = 'Invalid date range, start date must be before end date'
    }
  }

  return {
    dateRangeMessage,
    validEndDate,
    validStartDate
  }
}
