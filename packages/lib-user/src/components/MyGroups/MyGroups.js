'use client'

import { object } from 'prop-types'

import {
  usePanoptesMemberships,
  usePanoptesUser,
  useStats
} from '@hooks/index.js'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

const STATS_ENDPOINT = '/classifications/user_groups'

// the following GroupCard will be replaced with GroupCard component per PR 5943
function GroupCard({
  displayName = '',
  id = '',
  role = ''
}) {
  const { data, error, isLoading } = useStats({ endpoint: STATS_ENDPOINT, sourceId: id })

  return (
    <div>
      <h2>{displayName}</h2>
      <span>{role}</span>
      <div>
        <span>Classifications {data?.total_count}</span>
        <span>Hours {Math.round(data?.time_spent)}</span>
        <span>Members {data?.active_users}</span>
        <span>Projects {data?.project_contributions.length}</span>
      </div>
    </div>
  )
}

function MyGroups({
  authClient
}) {
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser(authClient)
  
  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    query: {
      include: 'user_group',
      user_id: user?.id
    }
  })

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)

  return (
    <div>
      <h3>MyGroups</h3>
      {activeGroupsWithRoles.length === 0 ? (
        <p>You are not an active member of any groups.</p>
      ) : null}
      {activeGroupsWithRoles.map((group) => {
        return (
          <GroupCard
            key={group.id}
            authClient={authClient}
            displayName={group.display_name}
            id={group.id}
            role={group.roles}
          />
        )
      })}
    </div>
  )
}

MyGroups.propTypes = {
  authClient: object
}

export default MyGroups
