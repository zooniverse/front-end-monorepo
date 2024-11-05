import { array, number, shape, string } from 'prop-types'

import DailyClassificationsChart from './DailyClassificationsChart'

const defaultCounts = {
  today: 0
}

function DailyClassificationsChartContainer({
  counts = defaultCounts,
  locale = 'en',
  projectName,
  thisWeek = []
}) {
  const TODAY = new Date()
  const stats = thisWeek.map(({ count: statsCount, period }) => {
    const [year, monthIndex, date] = period.split('-')
    const utcDay = Date.UTC(year, monthIndex - 1, date)
    const day = new Date(utcDay)
    const isToday = day.getUTCDay() === TODAY.getUTCDay()
    const count = isToday ? counts.today : statsCount
    const longLabel = day.toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'long' })
    const alt = `${longLabel}: ${count}`
    const label = day.toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'narrow' })
    return { alt, count, label, longLabel, period }
  })
  return (
    <DailyClassificationsChart
      stats={stats}
      projectName={projectName}
    />
  )
}

DailyClassificationsChartContainer.propTypes = {
  /** Today's counts, updated as classifications are made. */
  counts: shape({
    today: number
  }),
  /** The current locale. */
  locale: string,
  /** Project name */
  projectName: string.isRequired,
  /** Array of daily stats from the stats server */
  thisWeek: array
}

export default DailyClassificationsChartContainer
