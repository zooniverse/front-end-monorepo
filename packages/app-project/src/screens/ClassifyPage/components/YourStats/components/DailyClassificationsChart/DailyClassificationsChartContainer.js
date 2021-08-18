import counterpart from 'counterpart'
import { array, number, shape, string } from 'prop-types'

import DailyClassificationsChart from './DailyClassificationsChart'

const defaultCounts = {
  today: 0
}

function DailyClassificationsChartContainer({
  counts = defaultCounts,
  projectName,
  thisWeek = []
}) {
  const TODAY = new Date()
  const stats = thisWeek.map(stat => {
    const day = new Date(stat.period)
    const locale = counterpart.getLocale()
    const count = (day.getUTCDay() === TODAY.getUTCDay()) ? counts.today : stat.count
    const longLabel = day.toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'long' })
    const alt = `${longLabel}: ${count}`
    const label = day.toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'narrow' })
    return Object.assign({}, stat, { alt, count, label, longLabel })
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
  /** Project name */
  projectName: string.isRequired,
  /** Array of daily stats from the stats server */
  thisWeek: array
}

export default DailyClassificationsChartContainer
