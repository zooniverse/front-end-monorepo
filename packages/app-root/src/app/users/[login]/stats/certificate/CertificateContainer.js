'use client'

import { Certificate } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext, UserStatsContext } from '../../../../../contexts'
import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'

function CertificateContainer({
  login
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  const {
    selectedDateRange
  } = useContext(UserStatsContext)

  const selectedProject = 'AllProjects'

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
