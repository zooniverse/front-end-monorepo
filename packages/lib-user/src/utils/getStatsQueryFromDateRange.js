export default function getStatsQueryFromDateRange(dateRange) {
  switch (dateRange) {
    case 'Last7Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        project_contributions: true,
        start_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'Last30Days':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        project_contributions: true,
        start_date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'ThisMonth':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        project_contributions: true,
        start_date: new Date(new Date().setDate(1)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'Last3Months':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'week',
        project_contributions: true,
        start_date: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'ThisYear':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'month',
        project_contributions: true,
        start_date: new Date(new Date().setMonth(0)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'Last12Months':
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'month',
        project_contributions: true,
        start_date: new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString().substring(0, 10),
        time_spent: true
      }
    case 'AllTime':
      return {
        period: 'year',
        project_contributions: true,
        time_spent: true
      }
    default:
      return {
        end_date: new Date().toISOString().substring(0, 10),
        period: 'day',
        project_contributions: true,
        start_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().substring(0, 10),
        time_spent: true
      }
  }
}
