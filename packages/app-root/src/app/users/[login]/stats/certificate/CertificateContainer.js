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
  // set start date per query params, user created_at if user created_at more recent than 2015-03-17, or default to 2015-03-17 (the date ERAS stats begin)
  let selectedStartDate = startDate
  if (selectedStartDate === undefined) {
    selectedStartDate = user?.created_at?.substring(0, 10) > '2015-03-17' ? user.created_at.substring(0, 10) : '2015-03-17'
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
