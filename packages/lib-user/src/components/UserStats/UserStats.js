import { arrayOf, func, number, shape, string } from 'prop-types'

import {
  HeaderLink,
  Layout,
  MainContent,
  TopProjects
} from '@components/shared'

const DEFAULT_HANDLER = () => true
const DEFAULT_STATS = {
  data: [],
  project_contributions: [
    {
      count: 0,
      project_id: 0,
      session_time: 0
    }
  ],
  time_spent: 0,
  total_count: 0
}
const DEFAULT_USER = {
  id: '',
  login: '',
  display_name: ''
}

function UserStats({
  allProjectsStats = DEFAULT_STATS,
  handleDateRangeSelect = DEFAULT_HANDLER,
  handleProjectSelect = DEFAULT_HANDLER,
  projectStats = DEFAULT_STATS,
  projects = [],
  selectedDateRange = 'Last7Days',
  selectedProject = 'AllProjects',
  user = DEFAULT_USER
}) {
  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  return (
    <Layout
      primaryHeaderItem={
        <HeaderLink
          href={`https://www.zooniverse.org/users/${user?.login}`}
          label='back to profile'
          primaryItem={true}
        />
      }
    >
      <MainContent
        handleDateRangeSelect={handleDateRangeSelect}
        handleProjectSelect={handleProjectSelect}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        stats={stats}
        source={user}
      />
      <TopProjects
        allProjectsStats={allProjectsStats}
        projects={projects}
      />
    </Layout>
  )
}

const statsShape = shape({
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
  total_count: number
})

UserStats.propTypes = {
  allProjectsStats: statsShape,
  handleDateRangeSelect: func,
  handleProjectSelect: func,
  projectStats: statsShape,
  projects: arrayOf(shape({
    id: string,
    display_name: string
  })),
  selectedDateRange: string,
  selectedProject: string,
  user: shape({
    id: string
  })
}

export default UserStats
