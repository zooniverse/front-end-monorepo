'use client'

import { UserStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'
import AuthenticatedUsersPageContainer from '../../../../components/AuthenticatedUsersPageContainer'

function UserStatsContainer({
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
      <UserStats
        authUser={user}
        login={login}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default UserStatsContainer
