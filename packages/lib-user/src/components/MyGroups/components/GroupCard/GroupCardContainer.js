import { object, string } from 'prop-types'

import { useStats } from '@hooks'
import GroupCard from './GroupCard'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupCardContainer({
  authClient,
  displayName = '',
  id = '',
  role = '',
  userId = ''
}) {
  const {
    data,
    error,
    isLoading
  } = useStats({
    authClient,
    endpoint: STATS_ENDPOINT,
    sourceId: id,
    userId
  })

  const { total_count, time_spent, active_users, project_contributions } = data || {}

  return (
    <GroupCard
      displayName={displayName}
      classifications={total_count}
      contributors={active_users}
      hours={time_spent}
      projects={project_contributions?.length}
      role={role}
    />
  )
}

GroupCardContainer.propTypes = {
  authClient: object,
  displayName: string,
  id: string,
  role: string,
  userId: string
}

export default GroupCardContainer
