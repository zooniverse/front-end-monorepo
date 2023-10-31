'use client'

import { string } from 'prop-types'

import { 
  useGroupStats,
  usePanoptesUserGroup
} from '@hooks/index.js'

import EditGroup from './EditGroup.js'

function GroupStats ({
  authClient,
  groupID
}) {
  const { data: group, error, headers, isLoading: groupLoading } = usePanoptesUserGroup(authClient, groupID)
  const { data: groupStats, error: groupStatsError, isLoading: groupStatsLoading } = useGroupStats({ authClient, groupID })

  return (
    <div>
      <h2>Hi group with ID {groupID}! 🙌</h2>
      <h3>Your group display_name is {group?.display_name}.</h3>
      <h4>Members: <pre>{group?.links.users.toString()}</pre></h4>
      <h4>Here are your group stats:</h4>
      <pre>{JSON.stringify(groupStats, null, 2)}</pre>
      <hr />
      <EditGroup
        authClient={authClient}
        group={group}
        headers={headers}
      />
    </div>
  )
}

GroupStats.propTypes = {
  // authClient: object.isRequired,
  groupID: string.isRequired
}

export default GroupStats
