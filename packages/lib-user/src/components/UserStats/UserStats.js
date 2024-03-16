'use client'

import { arrayOf, func, number, shape, string } from 'prop-types'

import {
  Layout
} from '@components/shared'

import MainContent from './components/MainContent'
import TopProjects from './components/TopProjects'

const DEFAULT_HANDLER = () => true

function UserStats({
  allProjectsStats = {
    project_contributions: []
  },
  handleDateRangeSelect = DEFAULT_HANDLER,
  handleProjectSelect = DEFAULT_HANDLER,
  projects = [],
  projectStats = {
    project_contributions: []
  },
  selectedDateRange = 'Last7Days',
  selectedProject = 'AllProjects',
  user
}) {
  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  // set top projects based on selected date range and all project stats
  let topProjects = []
  const topProjectContributions = allProjectsStats.project_contributions
    .sort((a, b) => b.count - a.count)
  topProjects = topProjectContributions
    .map(projectContribution => {
      const projectData = projects?.find(project => project.id === projectContribution.project_id.toString())
      return projectData
    })
    .filter(project => project)
    .slice(0, 5)

  return (
    <Layout>
      <MainContent
        handleDateRangeSelect={handleDateRangeSelect}
        handleProjectSelect={handleProjectSelect}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        stats={stats}
        user={user}
      />
      <TopProjects
        topProjects={topProjects}
      />
    </Layout>
  )
}

UserStats.propTypes = {
  allProjectsStats: shape({
    project_contributions: arrayOf(shape({
      count: number,
      project_id: number
    }))
  }),
  handleDateRangeSelect: func,
  handleProjectSelect: func,
  projects: arrayOf(shape({
    id: string,
    display_name: string
  })),
  projectStats: shape({
    project_contributions: arrayOf(shape({
      count: number,
      project_id: number
    }))
  }),
  selectedDateRange: string,
  selectedProject: string,
  user: shape({
    id: string,
    login: string
  }).isRequired
}

export default UserStats
