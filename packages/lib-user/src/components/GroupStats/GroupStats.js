import { Grid } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  getDateInterval
} from '@utils'

import {
  Layout,
  MainContent,
  TopProjects
} from '@components/shared'

import getHeaderItems from './helpers/getHeaderItems'
import TopContributors from './components/TopContributors'
import DeleteGroup from './DeleteGroup'
import EditGroup from './EditGroup'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStats({
  adminMode,
  authUser,
  group,
  membership
}) {
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getDateInterval(selectedDateRange)
  allProjectsStatsQuery.top_contributors = 10
  
  const {
    data: allProjectsStats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: allProjectsStatsQuery
  })
  
  // fetch individual project stats
  const projectStatsQuery = getDateInterval(selectedDateRange)
  projectStatsQuery.project_id = parseInt(selectedProject)
  projectStatsQuery.top_contributors = 10
  
  const {
    data: projectStats,
    error: projectStatsError,
    isLoading: projectStatsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: projectStatsQuery
  })

  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  // fetch topContributors
  const topContributorsIds = stats?.top_contributors?.map(user => user.user_id)
  const {
    data: topContributors,
    error: topContributorsError,
    isLoading: topContributorsLoading
  } = usePanoptesUser({
    authUser,
    userIds: topContributorsIds
  })
  
  // fetch projects
  const projectIDs = allProjectsStats?.project_contributions?.map(project => project.project_id)

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectIDs)

  function handleProjectSelect (project) {
    setSelectedProject(project.value)
  }

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  // get header items based on user, group, and membership
  const { PrimaryHeaderItem, secondaryHeaderItems } = getHeaderItems({
    adminMode,
    authUser,
    group,
    membership
  })

  return (
    <Layout
      primaryHeaderItem={PrimaryHeaderItem}
      secondaryHeaderItems={secondaryHeaderItems}
    >
      <MainContent
        handleDateRangeSelect={handleDateRangeSelect}
        handleProjectSelect={handleProjectSelect}
        projects={projects}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        stats={stats}
        user={group}
      />
      <Grid
        columns='1/2'
        gap='30px'
      >
        <TopContributors
          stats={stats}
          topContributors={topContributors}
        />
        <TopProjects
          allProjectsStats={allProjectsStats}
          grid={true}
          projects={projects}
        />
      </Grid>
      <EditGroup
        group={group}
      />
      <hr />
      <DeleteGroup 
        groupId={group?.id}
      />
    </Layout>
  )
}

GroupStats.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  group: shape({
    display_name: string,
    id: string
  }),
  membership: shape({
    id: string,
    roles: arrayOf(string)
  })
}

export default GroupStats
