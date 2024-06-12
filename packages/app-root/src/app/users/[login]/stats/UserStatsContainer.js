'use client'

import { UserStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext, UserStatsContext } from '../../../../contexts'
import AuthenticatedUsersPageContainer from '../../../../components/AuthenticatedUsersPageContainer'

function UserStatsContainer({
  login
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  const {
    selectedDateRange,
    selectedProject,
    setSelectedDateRange,
    setSelectedProject
  } = useContext(UserStatsContext)

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
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        setSelectedDateRange={setSelectedDateRange}
        setSelectedProject={setSelectedProject}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default UserStatsContainer
