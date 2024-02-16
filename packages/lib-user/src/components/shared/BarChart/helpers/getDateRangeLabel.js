export default function getDateRangeLabel(dateRange) {
  switch (dateRange) {
    case 'Last7Days':
      return {
        countLabel: 'Day',
        time: 60,
        timeLabel: 'min',
        tLDS: { timeZone: 'UTC', weekday: 'short' }
      }
    case 'Last30Days':
      return { 
        countLabel: 'Day',
        time: 60,
        timeLabel: 'min',
        tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
      }
    case 'ThisMonth':
      return { 
        countLabel: 'Day',
        time: 60,
        timeLabel: 'min',
        tLDS: { timeZone: 'UTC', day: 'numeric' }
      }
    case 'Last3Months':
      return {
        countLabel: 'Week of',
        time: 3600,
        timeLabel: 'hrs',
        tLDS: {timeZone: 'UTC',  month: 'numeric', day: 'numeric' }
      }
    case 'ThisYear':
      return {
        countLabel: 'Month of',
        time: 3600,
        timeLabel: 'hrs',
        tLDS: { timeZone: 'UTC', month: 'short' }
      }
    case 'Last12Months':
      return {
        countLabel: 'Month of',
        time: 3600,
        timeLabel: 'hrs',
        tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
      }
    case 'AllTime':
      return {
        countLabel: 'Year',
        time: 3600,
        timeLabel: 'hrs',
        tLDS: { timeZone: 'UTC', year: 'numeric' }
      }
    default:
      return {
        countLabel: 'Day',
        time: 60,
        timeLabel: 'min',
        tLDS: { timeZone: 'UTC', weekday: 'short' }
      }
  }
}
