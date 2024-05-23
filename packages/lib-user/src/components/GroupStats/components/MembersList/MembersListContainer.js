import { shape, string } from 'prop-types'
import { useEffect, useState } from 'react'

import { usePanoptesMemberships } from '@hooks'

import {
  deletePanoptesMembership,
  updatePanoptesMembership
} from '@utils'

import MembersList from './MembersList'

function MembersListContainer({
  authUser,
  group
}) {
  const [memberships, setMemberships] = useState([])

  const {
    data: membershipsData,
    error,
    isLoading
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    query: {
      include: 'user',
      user_group_id: group?.id
    }
  })

  useEffect(() => {
    if (membershipsData) {
      setMemberships(membershipsData.memberships.filter(membership => membership.state === 'active'));
    }
  }, [membershipsData]);

  async function handleDeleteMembership({ membershipId }) {
    const deleteMembershipResponse = await deletePanoptesMembership({ membershipId })
    if (deleteMembershipResponse.ok) {
      const updatedMemberships = memberships.filter(membership => membership.id !== membershipId)
      setMemberships(updatedMemberships)
    }
  }

  async function handleUpdateMembership({ membershipId, data }) {
    const updateMembershipResponse = await updatePanoptesMembership({ membershipId, data })
    if (updateMembershipResponse.ok) {
      const updatedMemberships = memberships.map(membership => {
        if (membership.id === membershipId) {
          membership.roles = data.roles
        }
        return membership
      })
      setMemberships(updatedMemberships)
    }
  }

  return (
    <MembersList
      authUserId={authUser?.id}
      handleDeleteMembership={handleDeleteMembership}
      handleUpdateMembership={handleUpdateMembership}
      memberships={memberships}
      users={membershipsData?.linked?.users}
    />
  )
}

MembersListContainer.propTypes = {
  authUser: shape({
    id: string
  }),
  group: shape({
    id: string
  })
}

export default MembersListContainer
