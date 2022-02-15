import { array, number, shape, string } from 'prop-types'
import { useRouter } from 'next/router'

import DailyClassificationsChart from './DailyClassificationsChart'

const defaultCounts = {
  today: 0
}

function DailyClassificationsChartContainer({
  counts = defaultCounts,
  projectName,
  thisWeek = []
}) {
  const router = useRouter()
  const { locale } = router
  const TODAY = new Date()
  const stats = thisWeek.map(({ count: statsCount, period }) => {
    const day = new Date(period)
    const isToday = day.getUTCDay() === TODAY.getDay()
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
  /** Project name */
  projectName: string.isRequired,
  /** Array of daily stats from the stats server */
  thisWeek: array
}

export default DailyClassificationsChartContainer
