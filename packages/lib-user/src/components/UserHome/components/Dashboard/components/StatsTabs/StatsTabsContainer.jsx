import { shape, string } from 'prop-types'

import { useStats } from '@hooks'
import {
  getThisWeekDateRange
} from '@utils'
import StatsTabs from './StatsTabs'

const formatStatsPreview = ({ allTimeData, thisWeekData }) => {
  return {
    allTime: {
      classifications: allTimeData.total_count,
      projects: allTimeData.project_contributions?.length
    },
    thisWeek: {
      classifications: thisWeekData.total_count,
      projects: thisWeekData.project_contributions?.length
    }
  }
}

export default function StatsTabsContainer({ user }) {
  const allTimeQuery = {
    project_contributions: true
  }
  const { data: allTimeData } = useStats({
    sourceId: user?.id,
    query: allTimeQuery
  })
  
  const thisWeekDateRange = getThisWeekDateRange()
  const thisWeekQuery = {
    end_date: thisWeekDateRange.endDate,
    project_contributions: true,
    start_date: thisWeekDateRange.startDate,
  }
  const { data: thisWeekData } = useStats({
    sourceId: user?.id,
    query: thisWeekQuery
  })

  let statsPreview

  if (allTimeData && thisWeekData) {
    statsPreview = formatStatsPreview({ allTimeData, thisWeekData })
  }
  return <StatsTabs statsPreview={statsPreview} />
}

StatsTabsContainer.propTypes = {
  user: shape({
    id: string.isRequired
  })
}
