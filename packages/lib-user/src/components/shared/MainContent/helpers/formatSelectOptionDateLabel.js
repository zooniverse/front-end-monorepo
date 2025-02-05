export function formatSelectOptionDateLabel({ endDate, startDate }) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  const startDateLabel = new Date(startDate)
  const startDateYear = startDateLabel.getUTCFullYear().toString().substring(2)
  const startDateMonth = months[startDateLabel.getUTCMonth()]
  const startDateDay = startDateLabel.getUTCDate()
  
  const endDateLabel = new Date(endDate)
  const endDateYear = endDateLabel.getUTCFullYear().toString().substring(2)
  const endDateMonth = months[endDateLabel.getUTCMonth()]
  const endDateDay = endDateLabel.getUTCDate()

  const currentYear = new Date().getUTCFullYear().toString().substring(2)

  if (startDateYear === endDateYear && endDateYear === currentYear) {
    if (startDateMonth === endDateMonth) {
      return `${startDateMonth} ${startDateDay} - ${endDateDay}`
    }
    return `${startDateMonth} ${startDateDay} - ${endDateMonth} ${endDateDay}`
  }
  return `${startDateMonth} ${startDateDay}, ${startDateYear} - ${endDateMonth} ${endDateDay}, ${endDateYear}`
}
