import getStatsDateString from './getStatsDateString'

export default function getDateRangeSelectOptions(launchDate, t) {
  const today = new Date()
  const dateRangeOptions = [
    {
      label: t('ProjectStats.BarChart.dateRange.lastSevenDays').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 6))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.lastThirtyDays').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 29))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.thisMonth').toUpperCase(),
      value: getStatsDateString(
        new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.lastThreeMonths').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 90))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.thisYear').toUpperCase(),
      value: getStatsDateString(
        new Date(Date.UTC(today.getUTCFullYear(), 0, 1))
      )
    },
    {
      label: t(
        'ProjectStats.BarChart.dateRange.lastTwelveMonths'
      ).toUpperCase(),
      value: getStatsDateString(
        new Date(
          Date.UTC(
            today.getUTCFullYear() - 1,
            today.getUTCMonth() === 11 ? 0 : today.getUTCMonth() + 1,
            1
          )
        )
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.allTime').toUpperCase(),
      value: getStatsDateString(launchDate)
    }
  ]

  return dateRangeOptions
}
