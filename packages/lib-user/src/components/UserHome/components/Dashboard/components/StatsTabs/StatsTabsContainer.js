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
  const today = new Date()
  const todayUTC = today.toISOString().substring(0, 10)
  
  const thisWeekStart = new Date()
  thisWeekStart.setUTCDate(today.getUTCDate() - 6)
  const thisWeekQuery = getDateInterval({
    endDate: todayUTC,
    startDate: thisWeekStart.toISOString().substring(0, 10)
  })
  thisWeekQuery.project_contributions = true
  const { data: thisWeekData } = useStats({
    sourceId: user?.id,
    query: thisWeekQuery
  })

  const allTimeQuery = getDateInterval({
    endDate: todayUTC,
    startDate: user?.created_at?.substring(0, 10) || '2015-07-01'
  })
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
