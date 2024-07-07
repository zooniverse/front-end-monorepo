'use client'

import { GroupStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../contexts'

function GroupStatsContainer({
  endDate,
  groupId,
  joinToken,
  projectId,
  startDate
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  const router = useRouter()
  
  // set end date per query params or default to today
  let selectedEndDate = endDate
  if (!selectedEndDate) {
    selectedEndDate = new Date().toISOString().substring(0, 10)
  }
  // set start date per query params or default to 7 days ago
  let selectedStartDate = startDate
  if (!selectedStartDate) {
    selectedStartDate = new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().substring(0, 10)
  }
  
  // set selected project per query params or default to 'AllProjects'
  const selectedProject = projectId || 'AllProjects'

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
    // TODO: validate dates
    
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
    // TODO: validate selected project ID

    if (selectedProjectId === 'AllProjects') {
      updateQueryParams([['project_id', null]])
    } else {
      updateQueryParams([['project_id', selectedProjectId]])
    }
  }

  if (typeof window === 'undefined' || isLoading) {
    return (
      <p>Loading...</p>
    )
  }
  
  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
      joinToken={joinToken}
      selectedDateRange={{
        endDate: selectedEndDate,
        startDate: selectedStartDate
      }}
      selectedProject={selectedProject}
      setSelectedDateRange={setSelectedDateRange}
      setSelectedProject={setSelectedProject}
    />
  )
}

export default GroupStatsContainer
