'use client'

import { useContext } from 'react'
import { UserStatsAllProjects } from '@zooniverse/user'
import { PanoptesAuthContext } from '@/contexts'

import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer.js'

function AllProjectsContainer({ login }) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <UserStatsAllProjects authUser={user} login={login} />
    </AuthenticatedUsersPageContainer>
  )
}

export default AllProjectsContainer
