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

const DEFAULT_DATE_RANGE = {
  endDate: '',
  startDate: ''
}
const DEFAULT_HANDLER = () => true
const STATS_ENDPOINT = '/classifications/users'

function UserStatsContainer({
  authUser,
  login,
  selectedDateRange = DEFAULT_DATE_RANGE,
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
  const projectIds = allProjectsStats?.project_contributions?.map(project => project.project_id)
  
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects({
    cards: true,
    id: projectIds?.join(','),
    page_size: 100
  })

  return (
    <UserStats
      allProjectsStats={allProjectsStats}
      projectStats={projectStats}
      projects={projects}
      selectedDateRange={selectedDateRange}
      selectedProject={selectedProject}
      setSelectedDateRange={setSelectedDateRange}
      setSelectedProject={setSelectedProject}
      user={user}
    />
  )
}

UserStatsContainer.propTypes = {
  authUser: shape({
    id: string
  }),
  login: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func
}

export default UserStatsContainer
