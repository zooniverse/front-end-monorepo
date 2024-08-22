'use client'

import { Certificate } from '@zooniverse/user'
import { useContext } from 'react'

import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext } from '../../../../../contexts'

function CertificateContainer({
  endDate,
  login,
  paramsValidationMessage,
  projectId,
  startDate
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  // set end date per query params or default to today
  let selectedEndDate = endDate
  if (selectedEndDate === undefined) {
    selectedEndDate = new Date().toISOString().substring(0, 10)
  }
  // set start date per query params or user created_at
  let selectedStartDate = startDate
  if (selectedStartDate === undefined) {
    selectedStartDate = user?.created_at?.substring(0, 10)
  }

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
        paramsValidationMessage={paramsValidationMessage}
        selectedDateRange={{
          endDate: selectedEndDate,
          startDate: selectedStartDate
        }}
        selectedProject={projectId}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default CertificateContainer
