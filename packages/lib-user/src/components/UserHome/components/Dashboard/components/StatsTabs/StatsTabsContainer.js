import { shape, string } from 'prop-types'

import { useStats } from '@hooks'
import { getDateInterval } from '@utils'
import StatsTabs from './StatsTabs'

const formatStatsPreview = (thisWeekData, allTimeData) => {
  return {
    thisWeek: {
      classifications: thisWeekData.total_count,
      projects: thisWeekData.project_contributions?.length
    },
    allTime: {
      classifications: allTimeData.total_count,
      projects: allTimeData.project_contributions?.length
    }
  }
}

export default function StatsTabsContainer({ user }) {
  const thisWeekQuery = getDateInterval('Last7Days')
  thisWeekQuery.project_contributions = true
  const { data: thisWeekData } = useStats({
    sourceId: user?.id,
    query: thisWeekQuery
  })

  const allTimeQuery = getDateInterval('AllTime')
  allTimeQuery.project_contributions = true
  const { data: allTimeData } = useStats({
    sourceId: user?.id,
    query: allTimeQuery
  })

  let statsPreview

  if (thisWeekData && allTimeData) {
    statsPreview = formatStatsPreview(thisWeekData, allTimeData)
  }
  return <StatsTabs statsPreview={statsPreview} />
}

StatsTabsContainer.propTypes = {
  user: shape({
    id: string.isRequired
  })
}
