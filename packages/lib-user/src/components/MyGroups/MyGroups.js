'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial MyGroups local development.

import {
  usePanoptesUser,
  usePanoptesMemberships
} from '@hooks'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

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
        const roles = group.roles

        return (
          <div key={group.id}>
            <h4><a href={`./?groups=${group.id}`}>{group.display_name}</a></h4>
            <span>{roles}</span>
            <div>
              <span>Classifications X</span>
              {' | '}
              <span>Hours Y</span>
              {' | '}
              <span>Members Z</span>
              {' | '}
              <span>Projects W</span>
            </div>
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default MyGroups
