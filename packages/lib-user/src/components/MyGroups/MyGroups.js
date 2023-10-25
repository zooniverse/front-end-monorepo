'use client'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks/index.js'

function MyGroups({ authClient }) {
  const { data: user, error, isLoading: userLoading } = usePanoptesUser(authClient)
  const { data: membershipsWithGroups } = usePanoptesMemberships({ authClient, userID: user?.id, includeGroups: true })

  return (
    <div>
      <div>
        <h3>MyGroups</h3>
        {membershipsWithGroups?.linked?.user_groups?.map((group) => {
          const roles = membershipsWithGroups?.memberships?.find((membership) => membership.links.user_group === group.id)?.roles

          return (
            <div key={group.id}>
              <p>Group ID - {group.id}</p>
              <p>Group display_name - {group.display_name}</p>
              <p>Group roles - {roles}</p>
              <p><a href={`./?groups=${group.id}`}>stats</a></p>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyGroups
