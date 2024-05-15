'use client'

import { MyGroups } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'
import AuthenticatedUsersPageContainer from '../components/AuthenticatedUsersPageContainer'

function MyGroupsContainer({
  login
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <MyGroups
        authUser={user}
        login={login}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default MyGroupsContainer
