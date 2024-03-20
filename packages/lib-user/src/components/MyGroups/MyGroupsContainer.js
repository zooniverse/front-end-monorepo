'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial MyGroups local development.

import { object, string } from 'prop-types'

import {
  usePanoptesAuthUser,
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import {
  createPanoptesUserGroup,
  getBearerToken
} from '@utils'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

import MyGroups from './MyGroups'
import GroupCardList from './components/GroupCardList'

function MyGroupsContainer({
  authClient,
  login
}) {
  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authClient,
    authUser,
    authUserId: authUser?.id,
    login
  })
  
  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    authUserId: authUser?.id,
    query: {
      include: 'user_group',
      user_id: user?.id
    }
  })

  async function handleGroupCreate(data) {
    try {
      const authorization = await getBearerToken(authClient)
      const newGroup = await createPanoptesUserGroup({ data, authorization })
      console.log('newGroup', newGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)

  return (
    <MyGroups
      handleGroupCreate={handleGroupCreate}
    >
      <GroupCardList
        authClient={authClient}
        authUserId={authUser?.id}
        groups={activeGroupsWithRoles}
      />
    </MyGroups>
  )
}

MyGroupsContainer.propTypes = {
  authClient: object,
  login: string
}

export default MyGroupsContainer
