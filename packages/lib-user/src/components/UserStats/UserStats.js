'use client'

import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useUserStats
} from '@hooks'

import {
  getStatsQueryFromDateRange
} from '@utils'

import MainContent from './components/MainContent'

import Layout from '../shared/Layout/Layout'

function UserStats ({
  authClient,
  login = ''
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch user
  const { data: user, error, isLoading } = usePanoptesUser(authClient)
  
  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getStatsQueryFromDateRange(selectedDateRange)
  allProjectsStatsQuery.project_contributions = true
  allProjectsStatsQuery.time_spent = true
  
  const { data: allProjectsStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id, query: allProjectsStatsQuery })
  
  // fetch individual project stats
  const projectStatsQuery = getStatsQueryFromDateRange(selectedDateRange)
  projectStatsQuery.project_id = parseInt(selectedProject)
  projectStatsQuery.time_spent = true
  
  const { data: projectStats, error: projectStatsError, isLoading: projectStatsLoading } = useUserStats({ authClient, userID: user?.id, query: projectStatsQuery })
  
  // fetch projects
  const projectIDs = allProjectsStats?.project_contributions?.map(project => project.project_id)
  
  const { data: projects, error: projectsError, isLoading: projectsLoading } = usePanoptesProjects(projectIDs)

  function onActive (index) {
    setActiveTab(index)
  }

  function handleProjectSelect (project) {
    setSelectedProject(project.value)
  }

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  return (
    <Layout>
      <MainContent
        activeTab={activeTab}
        handleDateRangeSelect={handleDateRangeSelect}
        handleProjectSelect={handleProjectSelect}
        onActive={onActive}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        stats={stats}
        user={user}
      />
    </Layout>
  )
}

UserStats.propTypes = {
  authClient: object,
  login: string
}

export default UserStats
