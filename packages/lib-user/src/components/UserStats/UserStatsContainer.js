'use client'

import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesAuthUser,
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  getDateInterval
} from '@utils'

import UserStats from './UserStats'

const STATS_ENDPOINT = '/classifications/users'

function UserStatsContainer({
  authClient,
  login
}) {
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch authUser
  const {
    data: authUser,
    error,
    isLoading
  } = usePanoptesAuthUser(authClient)

  // fetch user
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authClient,
    authUser,
    authUserId: authUser?.id,
    login
  })
  
  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getDateInterval(selectedDateRange)
  allProjectsStatsQuery.project_contributions = true
  allProjectsStatsQuery.time_spent = true
  
  const {
    data: allProjectsStats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authClient,
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: user?.id,
    query: allProjectsStatsQuery
  })
  
  // fetch individual project stats
  const projectStatsQuery = getDateInterval(selectedDateRange)
  projectStatsQuery.project_id = parseInt(selectedProject)
  projectStatsQuery.time_spent = true
  
  const {
    data: projectStats,
    error: projectStatsError,
    isLoading: projectStatsLoading
  } = useStats({
    authClient,
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: user?.id,
    query: projectStatsQuery
  })
  
  // fetch projects
  const projectIds = allProjectsStats?.project_contributions?.map(project => project.project_id)
  
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectIds)

  function handleProjectSelect(project) {
    setSelectedProject(project.value)
  }

  function handleDateRangeSelect(dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  return (
    <UserStats
      allProjectsStats={allProjectsStats}
      handleDateRangeSelect={handleDateRangeSelect}
      handleProjectSelect={handleProjectSelect}
      projects={projects}
      projectStats={projectStats}
      selectedDateRange={selectedDateRange}
      selectedProject={selectedProject}
      user={user}
    />
  )
}

UserStatsContainer.propTypes = {
  authClient: object,
  login: string
}

export default UserStatsContainer
