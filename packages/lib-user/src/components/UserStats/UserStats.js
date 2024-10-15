import { arrayOf, bool, func, number, shape, string } from 'prop-types'

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
  error = undefined,
  loading = false,
  paramsValidationMessage = '',
  projectStats = DEFAULT_STATS,
  projects = [],
  selectedDateRange,
  selectedProject = undefined,
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER,
  user = DEFAULT_USER
}) {
  // set stats based on selected project
  const stats = selectedProject ? projectStats : allProjectsStats
  const totalProjects = allProjectsStats?.project_contributions?.length

  return (
    <Layout
      primaryHeaderItem={
        <HeaderLink
          href='/'
          label='back'
          primaryItem={true}
        />
      }
    >
      <MainContent
        error={error}
        loading={loading}
        paramsValidationMessage={paramsValidationMessage}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        setSelectedDateRange={setSelectedDateRange}
        setSelectedProject={setSelectedProject}
        stats={stats}
        source={user}
        totalProjects={totalProjects}
      />
      <TopProjects
        allProjectsStats={allProjectsStats}
        loading={loading}
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
  loading: bool,
  paramsValidationMessage: string,
  projectStats: statsShape,
  projects: arrayOf(shape({
    id: string,
    display_name: string
  })),
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func,
  user: shape({
    id: string
  })
}

export default UserStats
