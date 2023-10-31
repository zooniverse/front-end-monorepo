'use client'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks/index.js'

import CreateGroup from './CreateGroup.js'

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
      <hr />
      <CreateGroup authClient={authClient} />
    </div>
  )
}

export default MyGroups
