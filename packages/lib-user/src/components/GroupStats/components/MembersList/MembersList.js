import { shape, string } from 'prop-types'

import { usePanoptesMemberships } from '@hooks'

import {
  deletePanoptesMembership,
  updatePanoptesMembership
} from '@utils'

function MembersList({
  authUser,
  group
}) {
  const {
    data: membershipsData
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    query: {
      include: 'user',
      user_group_id: group?.id
    }
  })
  const memberships = membershipsData?.memberships?.filter(membership => membership.state === 'active')

  return (
    <div>
      <ul>
        {memberships?.map(membership => {
          const user = membershipsData?.linked?.users?.find(user => user.id === membership.links.user)
          const role = membership.roles[0]
          const otherRole = role === 'group_admin' ? 'group_member' : 'group_admin'
          
          return (
            <li key={membership.id}>
              <span>{role}</span>
              <span>{' '}</span>
              <span>{user.display_name} @{user.login}</span>
              <button
                disabled={user.id === authUser.id}
                onClick={() => updatePanoptesMembership({
                  membershipId: membership.id,
                  data: {
                    roles: [otherRole]
                  }
                })}
              >
                Make {otherRole}
              </button>
              <button
                disabled={user.id === authUser.id}
                onClick={() => deletePanoptesMembership({ membershipId: membership.id })}
              >
                Remove
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

MembersList.propTypes = {
  authUser: shape({
    id: string
  }),
  group: shape({
    id: string
  })
}

export default MembersList
