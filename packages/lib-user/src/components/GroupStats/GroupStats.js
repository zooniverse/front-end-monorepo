import ProjectCard from '@zooniverse/react-components/ProjectCard'
import { Grid } from 'grommet'
import { Link, SettingsOption } from 'grommet-icons'
import { func, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  getDateInterval,
} from '@utils'

import {
  ContentBox,
  HeaderButton,
  HeaderLink,
  HeaderToast,
  Layout,
  MainContent
} from '@components/shared'

import MemberCard from './components/MemberCard'
import DeleteGroup from './DeleteGroup'
import EditGroup from './EditGroup'

const STATS_ENDPOINT = '/classifications/user_groups'

const DEFAULT_GROUP = {
  display_name: '',
  id: ''
}
const DEFAULT_HANDLER = () => true
const DEFAULT_USER = {
  id: ''
}

function GroupStats({
  authUser = DEFAULT_USER,
  group = DEFAULT_GROUP,
  handleGroupDelete = DEFAULT_HANDLER,
  handleGroupUpdate = DEFAULT_HANDLER,
  login = ''
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
  const topContributorsWithStats = topContributors?.map(user => {
    const userStats = stats?.top_contributors?.find(topUser => topUser.user_id.toString() === user.id)
    return {
      classifications: userStats?.count,
      ...user
    }
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

  // set top projects based on selected date range and all project stats
  let topProjects = []
  const topProjectContributions = allProjectsStats?.project_contributions
    ?.sort((a, b) => b.count - a.count)

  if (topProjectContributions?.length > 0) {
    topProjects = topProjectContributions
      ?.map(projectContribution => {
        const projectData = projects?.find(project => project.id === projectContribution.project_id.toString())
        return projectData
      })
      .filter(project => project)
      .slice(0, 6)
  }

  const PrimaryHeaderItem = login ? (
    <HeaderLink
      href={`https://www.zooniverse.org/users/${login}`}
      label='back to profile'
      primaryItem={true}
    />
  ) : (
    <HeaderLink
      href='https://www.zooniverse.org/projects'
      label='back to projects'
      primaryItem={true}
    />
  )

  return (
    <Layout
      primaryHeaderItem={PrimaryHeaderItem}
      secondaryHeaderItems={[
        <HeaderToast
          key='copy-join-link-toast'
          icon={<Link color='white' size='small' />}
          label='Copy Join Link'
          message='Join Link Copied!'
          textToCopy={`https://www.zooniverse.org/groups/${group.id}?join_token=${group.join_token}`}
        />,
        <HeaderButton
          key='manage-group-button'
          icon={<SettingsOption color='white' size='small' />}
          label='Manage Group'
          onClick={() => alert('Coming soon!')}
        />
      ]}
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
        <ContentBox
          title='Top Contributors'
        >
        <Grid
          columns={[ 'auto', 'auto' ]}
          gap='small'
          rows={['repeat(5, auto)']}
          style={{ gridAutoFlow: 'column' }}
        >
          {topContributorsWithStats?.length ? (
            topContributorsWithStats.map((user) => (
              <MemberCard
                key={`MemberCard-${user?.id}`}
                avatar={user?.avatar_src}
                classifications={user?.classifications}
                displayName={user?.display_name}
                login={user?.login}
              />
            ))
          ) : null}
        </Grid>
        </ContentBox>
        <ContentBox
          linkLabel='See more'
          linkProps={{ href: 'https://www.zooniverse.org/projects' }}
          title='Top Projects'
          width='625px'
        >
          <Grid
            justify='center'
            columns='1/3'
            gap='small'
          >
            {topProjects.map(topProject => {
              return (
                <ProjectCard
                  key={topProject?.id}
                  description={topProject?.description}
                  displayName={topProject?.display_name}
                  href={`https://www.zooniverse.org/projects/${topProject?.slug}`}
                  imageSrc={topProject?.avatar_src}
                  size='small'
                />
              )
            })}
          </Grid>
        </ContentBox>
      </Grid>
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

GroupStats.propTypes = {
  authUser: shape({
    id: string
  }),
  group: shape({
    display_name: string,
    id: string
  }),
  handleGroupDelete: func,
  handleGroupUpdate: func,
  login: string
}

export default GroupStats
