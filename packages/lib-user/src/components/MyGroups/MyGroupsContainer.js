'use client'

import { object, string } from 'prop-types'

import {
  usePanoptesAuthUser,
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import MyGroups from './MyGroups'

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
    },
  })

  return (
    <MyGroups
      authClient={authClient}
      authUserId={authUser?.id}
      membershipsWithGroups={membershipsWithGroups}
    />
  )
}

MyGroupsContainer.propTypes = {
  authClient: object,
  login: string
}

export default MyGroupsContainer
