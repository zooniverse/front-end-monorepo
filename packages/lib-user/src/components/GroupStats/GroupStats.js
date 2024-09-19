import { Grid, ResponsiveContext } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { useContext, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import {
  usePanoptesProjects,
  usePanoptesUsers,
  useStats
} from '@hooks'

import {
  deletePanoptesMembership,
  getDateInterval
} from '@utils'

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
const DEFAULT_HANDLER = () => true

function GroupStats({
  adminMode,
  authUser,
  group,
  membership,
  paramsValidationMessage = '',
  selectedDateRange,
  selectedProject = undefined,
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER
}) {
  const [groupModalActive, setGroupModalActive] = useState(false)

  const size = useContext(ResponsiveContext)
  
  // define user_group membership key
  const membershipKey = {
    authUserId: authUser?.id,
    query: {
      user_group_id: group?.id,
      user_id: authUser?.id
    }
  }
  // define user_group membership delete mutation
  const { trigger: deleteMembership } = useSWRMutation(membershipKey, deletePanoptesMembership)

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
    sourceId: paramsValidationMessage ? null : group?.id,
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
    sourceId: selectedProject ? group?.id : null,
    query: projectStatsQuery
  })

  // set stats based on selected project or all projects
  const stats = selectedProject ? projectStats : allProjectsStats
  const totalProjects = allProjectsStats?.project_contributions?.length

  // fetch topContributors
  const topContributorsIds = showTopContributors ? stats?.top_contributors?.map(user => user.user_id) : null
  const usersQuery = {
    id: topContributorsIds?.join(',')
  }
  const {
    data: topContributors,
    error: topContributorsError,
    isLoading: topContributorsLoading
  } = usePanoptesUsers(usersQuery)
  
  // fetch projects
  const projectIds = allProjectsStats?.project_contributions?.map(project => project.project_id)
  const projectsQuery = {
    cards: true,
    id: projectIds?.join(','),
    page_size: 100
  }
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectsQuery)

  function handleGroupModalActive () {
    setGroupModalActive(!groupModalActive)
  }

  async function handleGroupMembershipLeave ({
    membershipId
  }) {
    const userConfirmed = window.confirm('Are you sure you want to leave this group?')
    if (!userConfirmed) return

    await deleteMembership({ membershipId }, {
      revalidate: true
    })
  
    window.location.href = '/'
  }

  // get header items based on user, group, and membership
  const { PrimaryHeaderItem, secondaryHeaderItems } = getHeaderItems({
    adminMode,
    authUser,
    group,
    handleGroupMembershipLeave,
    handleGroupModalActive,
    membership
  })

  const error = statsError || projectStatsError || projectsError
  const loading = statsLoading || projectStatsLoading || projectsLoading

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
          error={error}
          loading={loading}
          paramsValidationMessage={paramsValidationMessage}
          projects={projects}
          selectedDateRange={selectedDateRange}
          selectedProject={selectedProject}
          setSelectedDateRange={setSelectedDateRange}
          setSelectedProject={setSelectedProject}
          stats={stats}
          source={group}
          totalProjects={totalProjects}
        />
        {showTopContributors ? (
          <Grid
            columns={size === 'large' ? ['1fr 1fr'] : ['1fr']}
            gap='30px'
          >
            {size === 'large' ? (
              <>
                <TopContributors
                  error={topContributorsError}
                  groupId={group?.id}
                  loading={loading || topContributorsLoading}
                  stats={stats}
                  topContributors={topContributors}
                />
                <TopProjects
                  allProjectsStats={allProjectsStats}
                  grid={true}
                  loading={loading}
                  projects={projects}
                />
              </>
            ) : (
              <>
                <TopProjects
                  allProjectsStats={allProjectsStats}
                  grid={false}
                  loading={loading}
                  projects={projects}
                />
                <TopContributors
                  error={topContributorsError}
                  groupId={group?.id}
                  loading={loading || topContributorsLoading}
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
            loading={loading}
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
  }),
  paramsValidationMessage: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func
}

export default GroupStats
