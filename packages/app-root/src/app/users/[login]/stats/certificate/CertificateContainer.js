'use client'

import { Certificate } from '@zooniverse/user'
import { useContext } from 'react'

import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext, UserStatsContext } from '../../../../../contexts'

function CertificateContainer({
  login,
  projectId
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  const {
    selectedDateRange
  } = useContext(UserStatsContext)

  const selectedProject = projectId || 'AllProjects'

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <Certificate
        authUser={user}
        login={login}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default CertificateContainer
