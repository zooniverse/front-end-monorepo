import { string } from 'prop-types'

import { useStats } from '@hooks'
import GroupCard from './GroupCard'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupCardContainer({
  displayName = '',
  id = '',
  role = ''
}) {
  const { data, error, isLoading } = useStats({ endpoint: STATS_ENDPOINT, sourceId: id })

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
  displayName: string,
  id: string,
  role: string
}

export default GroupCardContainer
