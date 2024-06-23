import { Grid, ResponsiveContext } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext, useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import { getDateInterval } from '@utils'

import {
  GroupModal,
  Layout,
  MainContent,
  TopProjects
} from '@components/shared'

import GroupUpdateFormContainer from './components/GroupUpdateFormContainer'
import MembersList from './components/MembersList'
import TopContributors from './components/TopContributors'
import getHeaderItems from './helpers/getHeaderItems'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStats({
  adminMode,
  authUser,
  group,
  membership
}) {
  const [groupModalActive, setGroupModalActive] = useState(false)
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  const size = useContext(ResponsiveContext)

  const showTopContributors = adminMode 
    || membership?.roles.includes('group_admin')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'private_show_agg_and_ind')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'public_agg_show_ind_if_member')
    || group?.stats_visibility === 'public_show_all'

  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getDateInterval(selectedDateRange)
  if (showTopContributors) {
    allProjectsStatsQuery.top_contributors = 10
  }
  
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
  if (showTopContributors) {
    projectStatsQuery.top_contributors = 10
  }
  
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
  const topContributorsIds = showTopContributors ? stats?.top_contributors?.map(user => user.user_id) : null
  const {
    data: topContributors,
    error: topContributorsError,
    isLoading: topContributorsLoading
  } = usePanoptesUser({
    authUser,
    userIds: topContributorsIds
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

  function handleGroupModalActive () {
    setGroupModalActive(!groupModalActive)
  }

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
    handleGroupModalActive,
    membership
  })

  return (
    <>
      <GroupModal
        active={groupModalActive}
        handleClose={handleGroupModalActive}
        title='manage group'
        titleColor='black'
      >
        <GroupUpdateFormContainer
          adminMode={adminMode}
          authUserId={authUser?.id}
          group={group}
          handleGroupModalActive={handleGroupModalActive}
          login={authUser?.login}
        >
          <MembersList
            authUser={authUser}
            group={group}
          />
        </GroupUpdateFormContainer>
      </GroupModal>
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
          source={group}
        />
        {showTopContributors ? (
          <Grid
            columns={size === 'large' ? ['1fr 1fr'] : ['1fr']}
            gap='30px'
          >
            {size === 'large' ? (
              <>
                <TopContributors
                  groupId={group?.id}
                  stats={stats}
                  topContributors={topContributors}
                />
                <TopProjects
                  allProjectsStats={allProjectsStats}
                  grid={true}
                  projects={projects}
                />
              </>
            ) : (
              <>
                <TopProjects
                  allProjectsStats={allProjectsStats}
                  grid={false}
                  projects={projects}
                />
                <TopContributors
                  groupId={group?.id}
                  stats={stats}
                  topContributors={topContributors}
                />
              </>
            )}
          </Grid>
        ) : (
          <TopProjects
            allProjectsStats={allProjectsStats}
            grid={false}
            projects={projects}
          />
        )}
      </Layout>
    </>
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
