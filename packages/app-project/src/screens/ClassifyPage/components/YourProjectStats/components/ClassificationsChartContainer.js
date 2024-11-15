import ClassificationsChart from './ClassificationsChart.js'
import { arrayOf, number, shape, string } from 'prop-types'
import { useRouter } from 'next/router.js'

import { getTodayDateString, getSevenDaysAgoDateString } from '../helpers/dateRangeHelpers.js'

const defaultStatsData = {
  data: [{
    count: 0,
    period: []
  }],
  total_count: 0
}

export default function ClassificationsChartContainer({ stats = defaultStatsData }) {
  const router = useRouter()

  // Similar to getCompleteData() in lib-user's bar chart.
  // The data.period array returned from ERAS includes only days you've classified on
  // but we want to display all seven days in the ClassificationsChart
  const completeData = []
  let index = 0

  // Use the same date strings that were used in the sevenDaysAgo ERAS query
  const todayDateString = getTodayDateString()
  const sevenDaysAgoString = getSevenDaysAgoDateString()

  // Loop to current date starting seven days ago and see if there's matching data returned from ERAS
  let currentDate = new Date(sevenDaysAgoString)
  const endDate = new Date(todayDateString)

  while (currentDate <= endDate) {
    const matchingData = stats.data.find(stat => {
      const statPeriod = new Date(stat.period)
      const match = currentDate.getUTCDate() === statPeriod.getUTCDate()
      return match
    })

    if (matchingData) {
      completeData.push({
        index,
        ...matchingData
      })
    } else {
      completeData.push({
        index,
        period: currentDate.toISOString(),
        count: 0
      })
    }

    currentDate.setUTCDate(currentDate.getUTCDate() + 1)
    index += 1
  }

  // Attach 'day of the week' labels to each stat
  const statsWithLabels = completeData.map(({ count, period }) => {
    const date = new Date(period)
    const longLabel = date.toLocaleDateString(router?.locale, { weekday: 'long' })
    const alt = `${longLabel}: ${count}`
    const label = date.toLocaleDateString(router?.locale, { weekday: 'short' })
    return { alt, count, label, longLabel, period }
  })

  return <ClassificationsChart stats={statsWithLabels} />
}

ClassificationsChartContainer.propTypes = {
  stats: shape({
    data: arrayOf(shape({
      count: number,
      period: string
    })),
    total_count: number
  })
}
