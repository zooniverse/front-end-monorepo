export default function getStatsQueryFromDateRange(dateRange) {
  function getNextMonth(month) {
    return month === 11 ? 0 : month + 1
  }
  
  switch (dateRange) {
    case 'Last7Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().substring(0, 10)
      }
    case 'Last30Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 29)).toISOString().substring(0, 10)
      }
    case 'ThisMonth':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(0)).toISOString().substring(0, 10)
      }
    case 'Last3Months':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'week',
        start_date: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().substring(0, 10)
      }
    case 'ThisYear':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'month',
        start_date: new Date(new Date().setMonth(0)).toISOString().substring(0, 10)
      }
    case 'Last12Months':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'month',
        start_date: new Date((new Date().getFullYear() - 1), getNextMonth(new Date().getMonth()), 1).toISOString().substring(0, 10)
      }
    case 'AllTime':
      return {
        period: 'year'
      }
    default:
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().substring(0, 10)
      }
  }
}
