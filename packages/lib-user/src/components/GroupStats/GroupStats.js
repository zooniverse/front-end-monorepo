import { arrayOf, func, number, shape, string } from 'prop-types'

import {
  ContentBox,
  Layout,
  MainContent,
  ProjectCard
} from '@components/shared'

import DeleteGroup from './DeleteGroup'
import EditGroup from './EditGroup'

const DEFAULT_GROUP = {
  display_name: '',
  id: ''
}
const DEFAULT_HANDLER = () => true
const DEFAULT_STATS = {
  active_users: 0,
  data: [],
  project_contributions: [
    {
      count: 0,
      project_id: 0,
      session_time: 0
    }
  ],
  time_spent: 0,
  top_contributors: [
    {
      count: 0,
      session_time: 0,
      user_id: 0
    }
  ],
  total_count: 0
}

function GroupStats({
  allProjectsStats = DEFAULT_STATS,
  group = DEFAULT_GROUP,
  handleDateRangeSelect = DEFAULT_HANDLER,
  handleGroupDelete = DEFAULT_HANDLER,
  handleGroupUpdate = DEFAULT_HANDLER,
  handleProjectSelect = DEFAULT_HANDLER,
  projectStats = DEFAULT_STATS,
  projects = [],
  selectedDateRange = 'Last7Days',
  selectedProject = 'AllProjects'
}) {
  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats
  
  return (
    <Layout>
      <MainContent
        handleDateRangeSelect={handleDateRangeSelect}
        handleProjectSelect={handleProjectSelect}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        stats={stats}
        user={group}
      />
      <EditGroup
        group={group}
        handleGroupUpdate={handleGroupUpdate}
      />
      <hr />
      <DeleteGroup
        handleGroupDelete={handleGroupDelete}
      />
    </Layout>
  )
}

const statsShape = shape({
  active_users: number,
  data: arrayOf(shape({
    count: number,
    period: string,
    session_time: number
  })),
  project_contributions: arrayOf(shape({
    count: number,
    project_id: number,
    session_time: number
  })),
  time_spent: number,
  top_contributors: arrayOf(shape({
    count: number,
    session_time: number,
    user_id: number
  })),
  total_count: number
})

GroupStats.propTypes = {
  allProjectsStats: statsShape,
  group: shape({
    display_name: string,
    id: string
  }),
  handleDateRangeSelect: func,
  handleGroupDelete: func,
  handleGroupUpdate: func,
  handleProjectSelect: func,
  projectStats: statsShape,
  projects: arrayOf(shape({
    id: string,
    display_name: string
  })),
  selectedDateRange: string,
  selectedProject: string
}

export default GroupStats
