'use client'

import { GroupStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'

import { PanoptesAuthContext } from '../../../contexts'

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
  // set start date per query params or default to 7 days ago
  let selectedStartDate = startDate
  if (selectedStartDate === undefined) {
    const defaultStartDate = new Date()
    defaultStartDate.setUTCDate(defaultStartDate.getUTCDate() - 6)
    selectedStartDate = defaultStartDate.toISOString().substring(0, 10)
  }

  useEffect(function updateStartDateParam() {
    if (selectedStartDate && (startDate === undefined)) {
      updateQueryParams([['start_date', selectedStartDate]])
    }
  }, [selectedStartDate, startDate])

  function updateQueryParams(newQueryParams) {
    const queryParams = new URLSearchParams(window.location.search)

    for (const [key, value] of newQueryParams) {
      if (!value) {
        queryParams.delete(key);
      } else {
        queryParams.set(key, value);
      }
    }

    router.push(`${window.location.pathname}?${queryParams.toString()}`)
  }

  function setSelectedDateRange({ endDate, startDate }) {
    const todayUTC = new Date().toISOString().substring(0, 10)
    if (endDate === todayUTC) {
      updateQueryParams([
        ['end_date', null],
        ['start_date', startDate]
      ])
    } else {
      updateQueryParams([
        ['end_date', endDate],
        ['start_date', startDate]
      ])
    }
  }

  function setSelectedProject(selectedProjectId) {
    if (!selectedProjectId) {
      updateQueryParams([['project_id', null]])
    } else {
      updateQueryParams([['project_id', selectedProjectId]])
    }
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
