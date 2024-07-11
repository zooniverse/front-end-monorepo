export function formatDateRange({ startDate, endDate }) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  let formattedStartDate = `${start.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })} ${start.getUTCDate()}`
  let formattedEndDate = `${end.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })} ${end.getUTCDate()}, ${end.getUTCFullYear()}`

  if (start.getUTCFullYear() !== end.getUTCFullYear()) {
    formattedStartDate += `, ${start.getUTCFullYear()} - `
  } else if (start.getUTCMonth() !== end.getUTCMonth()) {
    formattedStartDate += ` - `
  } else {
    formattedEndDate = ` - ${end.getUTCDate()}, ${end.getUTCFullYear()}`
  }

  return formattedStartDate + formattedEndDate
}
