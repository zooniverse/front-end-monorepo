import { string } from 'prop-types'

import { useStats } from '@hooks'
import { convertStatsSecondsToHours } from '@utils'

import GroupCard from './GroupCard'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupCardContainer({
  displayName,
  id,
  role
}) {
  const {
    data
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: id
  })

  const { total_count, time_spent, active_users, project_contributions } = data || {}

  const hoursSpent = convertStatsSecondsToHours(time_spent)

  return (
    <GroupCard
      classifications={total_count}
      contributors={active_users}
      displayName={displayName}
      hours={hoursSpent}
      id={id}
      projects={project_contributions?.length}
      role={role}
    />
  )
}

GroupCardContainer.propTypes = {
  displayName: string,
  id: string,
  role: string
}

export default GroupCardContainer
