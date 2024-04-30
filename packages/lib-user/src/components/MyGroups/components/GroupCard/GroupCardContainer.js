import { string } from 'prop-types'

import { useStats } from '@hooks'
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

  const hoursSpent = time_spent >= 0 ? time_spent / 3600 : 0

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
