'use client'

import { Certificate } from '@zooniverse/user'
import { useContext } from 'react'

import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext } from '../../../../../contexts'

function CertificateContainer({
  endDate,
  login,
  projectId,
  startDate
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  // set end date per query params or default to today
  let selectedEndDate = endDate
  if (!selectedEndDate) {
    selectedEndDate = new Date().toISOString().substring(0, 10)
  }
  // set start date per query params, user created_at, or default to all time
  let selectedStartDate = startDate
  if (!selectedStartDate) {
    selectedStartDate = user?.created_at?.substring(0, 10) || '2015-07-01'
  }
  
  // set selected project per query params or default to 'AllProjects'
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
        selectedDateRange={{
          endDate: selectedEndDate,
          startDate: selectedStartDate
        }}
        selectedProject={selectedProject}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default CertificateContainer
