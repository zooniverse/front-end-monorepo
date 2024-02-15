export default function getStatsQueryFromDateRange(dateRange) {
  switch (dateRange) {
    case 'Last7Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().substring(0, 10)
      }
    case 'Last30Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substring(0, 10)
      }
    case 'ThisMonth':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(1)).toISOString().substring(0, 10)
      }
    case 'Last3Months':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'week',
        start_date: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().substring(0, 10)
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
        start_date: new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString().substring(0, 10)
      }
    case 'AllTime':
      return {
        period: 'year'
      }
    default:
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        start_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().substring(0, 10)
      }
  }
}
