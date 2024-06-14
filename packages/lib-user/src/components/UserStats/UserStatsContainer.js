'use client'

import { func, shape, string } from 'prop-types'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  getDateInterval
} from '@utils'

import UserStats from './UserStats'

const DEFAULT_HANDLER = () => true
const STATS_ENDPOINT = '/classifications/users'

function UserStatsContainer({
  authUser,
  login,
  selectedDateRange = 'Last7Days',
  selectedProject = 'AllProjects',
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER
}) {
  // fetch user
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authUser,
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
    endpoint: STATS_ENDPOINT,
    sourceId: user?.id,
    query: projectStatsQuery
  })
  
  // fetch projects
  const projectIDs = allProjectsStats?.project_contributions?.map(project => project.project_id)
  
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectIDs)

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  function handleProjectSelect (project) {
    setSelectedProject(project.value)
  }

  return (
    <UserStats
      allProjectsStats={allProjectsStats}
      handleDateRangeSelect={handleDateRangeSelect}
      handleProjectSelect={handleProjectSelect}
      projectStats={projectStats}
      projects={projects}
      selectedDateRange={selectedDateRange}
      selectedProject={selectedProject}
      user={user}
    />
  )
}

UserStatsContainer.propTypes = {
  authUser: shape({
    id: string
  }),
  login: string,
  selectedDateRange: string,
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func
}

export default UserStatsContainer
