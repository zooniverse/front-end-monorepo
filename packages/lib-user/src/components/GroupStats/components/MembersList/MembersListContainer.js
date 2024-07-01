import { shape, string } from 'prop-types'
import useSWRMutation from 'swr/mutation'

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
  const query = {
    include: 'user',
    user_group_id: group?.id
  }
  
  const {
    data: membershipsData,
    error,
    isLoading
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    query
  })

  const { trigger: deleteMembership } = useSWRMutation({ query }, deletePanoptesMembership)
  const { trigger: updateMembership } = useSWRMutation({ query }, updatePanoptesMembership)

  const memberships = membershipsData?.memberships?.filter(membership => membership.state === 'active')

  function handleDeleteMembership({ membershipId }) {
    try {
      deleteMembership({ membershipId }, {
        optimisticData: (prevMembershipsData) => ({
          ...prevMembershipsData,
          memberships: prevMembershipsData?.memberships?.filter(membership => membership.id !== membershipId)
        }),
        revalidate: false,
        rollbackOnError: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleUpdateMembership({ membershipId, data }) {
    try {
      updateMembership({ membershipId, data }, {
        optimisticData: (prevMembershipsData) => ({
          ...prevMembershipsData,
          memberships: prevMembershipsData?.memberships?.map(membership => {
            if (membership.id === membershipId) {
              return {
                ...membership,
                ...data
              }
            }
            return membership
          })
        }),
        populateCache: (updatedMembership, prevMembershipsData) => ({
          ...prevMembershipsData,
          memberships: prevMembershipsData?.memberships?.map(membership => {
            if (membership.id === updatedMembership.id) {
              return updatedMembership
            }
            return membership
          })
        }),
        revalidate: false,
        rollbackOnError: true
      })
    } catch (error) {
      console.error(error)
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
