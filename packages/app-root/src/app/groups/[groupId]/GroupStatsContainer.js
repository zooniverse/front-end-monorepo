'use client'

import { GroupStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'

import { PanoptesAuthContext } from '../../../contexts'

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

function GroupStatsContainer({
  endDate,
  groupId,
  joinToken,
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
  // set start date per query params or leave as undefined
  let selectedStartDate = startDate

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

  if (isLoading) {
    return (
      <Box as='main' height='100vh' align='center' justify='center'>
        <Loader />
      </Box>
    )
  }

  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
      joinToken={joinToken}
      paramsValidationMessage={paramsValidationMessage}
      selectedDateRange={{
        endDate: selectedEndDate,
        startDate: selectedStartDate
      }}
      selectedProject={projectId}
      setSelectedDateRange={setSelectedDateRange}
      setSelectedProject={setSelectedProject}
    />
  )
}

export default GroupStatsContainer
