'use client'

import { UserStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

import AuthenticatedUsersPageContainer from '../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext } from '../../../../contexts'

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

function UserStatsContainer({
  endDate,
  login,
  paramsValidationMessage,
  projectId,
  startDate
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  
  const router = useRouter()

  // set end date per query params or default to today
  let selectedEndDate = endDate
  if (selectedEndDate === undefined) {
    selectedEndDate = new Date().toISOString().substring(0, 10)
  }
  // set start date per query params or default to 7 days ago
  let selectedStartDate = startDate
  if (selectedStartDate === undefined) {
    const defaultStartDate = new Date()
    defaultStartDate.setUTCDate(defaultStartDate.getUTCDate() - 6)
    selectedStartDate = defaultStartDate.toISOString().substring(0, 10)
  }

  useEffect(function updateStartDateParam() {
    if (selectedStartDate && (startDate === undefined)) {
      const newQueryParams = updateQueryParams([['start_date', selectedStartDate]])
      router.replace(`${window.location.pathname}?${newQueryParams.toString()}`)
    }
  }, [selectedStartDate, startDate, router])

  

  function setSelectedDateRange({ endDate, startDate }) {
    const todayUTC = new Date().toISOString().substring(0, 10)
    const newQueryParams = endDate === todayUTC
      ? updateQueryParams([
        ['end_date', null],
        ['start_date', startDate]
      ])
      : updateQueryParams([
        ['end_date', endDate],
        ['start_date', startDate]
      ])
    router.push(`${window.location.pathname}?${newQueryParams.toString()}`)
  }

  function setSelectedProject(selectedProjectId) {
    const newQueryParams = !selectedProjectId
      ? updateQueryParams([['project_id', null]])
      : updateQueryParams([['project_id', selectedProjectId]])
    router.push(`${window.location.pathname}?${newQueryParams.toString()}`)
  }

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
        paramsValidationMessage={paramsValidationMessage}
        selectedDateRange={{
          endDate: selectedEndDate,
          startDate: selectedStartDate
        }}
        selectedProject={projectId}
        setSelectedDateRange={setSelectedDateRange}
        setSelectedProject={setSelectedProject}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default UserStatsContainer
