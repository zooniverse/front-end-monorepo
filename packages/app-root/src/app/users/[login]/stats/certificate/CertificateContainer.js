'use client'

import { Certificate, usePanoptesUser } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext } from '../../../../../contexts'

function updateQueryParams(newQueryParams) {
  const queryParams = new URLSearchParams(window.location.search)

  for (const [key, value] of newQueryParams) {  
    if (!value) {
      queryParams.delete(key);
    } else {
      queryParams.set(key, value);
    }
  }

  return queryParams
}

function CertificateContainer({
  endDate,
  login,
  paramsValidationMessage,
  projectId,
  startDate
}) {
  const { adminMode, isLoading, user: authUser } = useContext(PanoptesAuthContext)

  // fetch user with created_at property
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authUser,
    login,
    requiredUserProperty: 'created_at'
  })
  
  const router = useRouter()
  
  // set end date per query params or default to today
  let selectedEndDate = endDate
  if (selectedEndDate === undefined) {
    selectedEndDate = new Date().toISOString().substring(0, 10)
  }
  // set start date per query params or default to user.created_at
  let selectedStartDate = startDate
  if (selectedStartDate === undefined) {
    selectedStartDate = user?.created_at?.substring(0, 10)
  }

  useEffect(function updateStartDateParam() {
    if (selectedStartDate && (startDate === undefined)) {
      const newQueryParams = updateQueryParams([['start_date', selectedStartDate]])
      router.replace(`${window.location.pathname}?${newQueryParams.toString()}`)
    }
  }, [selectedStartDate, startDate, router])

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading || userLoading}
      login={login}
      user={authUser}
    >
      <Certificate
        authUser={authUser}
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
