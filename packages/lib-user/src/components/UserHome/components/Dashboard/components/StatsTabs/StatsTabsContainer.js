import { shape, string } from 'prop-types'

import { useStats } from '@hooks'
import {
  getDateInterval,
  getDefaultDateRange,
  getStatsDateString
} from '@utils'
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

const DEFAULT_DATE_RANGE = getDefaultDateRange() // last 7 days

export default function StatsTabsContainer({ user }) {
  const thisWeekQuery = getDateInterval(DEFAULT_DATE_RANGE)
  thisWeekQuery.project_contributions = true
  const { data: thisWeekData } = useStats({
    sourceId: user?.id,
    query: thisWeekQuery
  })

  const allTimeQuery = getDateInterval({
    endDate: getStatsDateString(new Date()), // Today's UTC date string like 2024-09-23.
    startDate: getStatsDateString(user?.created_at) // Limit stats range to when the user acccount was created in panoptes.
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
