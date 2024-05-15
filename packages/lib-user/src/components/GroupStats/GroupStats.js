import ProjectCard from '@zooniverse/react-components/ProjectCard'
import { Grid } from 'grommet'
import { Layer, Link, SettingsOption, SubtractCircle } from 'grommet-icons'
import { func, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
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
  login = '',
  role = null
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

  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

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

  // Set header items based on user role and group visibility
  const publicGroup = group.stats_visibility.slice(0, 6) === 'public'
  const PrimaryHeaderItem = (!role && publicGroup) ? (
      <HeaderToast
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        primaryItem={true}
        textToCopy={`zooniverse.org/groups/${group.id}`}
      />
    ) : (
      <HeaderLink
        href={`https://www.zooniverse.org/users/${login}`}
        label='back to profile'
        primaryItem={true}
      />
    )
  let secondaryHeaderItems = []
  if (role === 'group_member') {
    secondaryHeaderItems.push(
      <HeaderButton
        key='leave-group-button'
        icon={<SubtractCircle color='white' size='small' />}
        label='Leave Group'
        onClick={() => alert('Coming soon!')}
      />
    )
    if (publicGroup) secondaryHeaderItems.push(
      <HeaderToast
        key='share-group-toast'
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        textToCopy={`zooniverse.org/groups/${group.id}`}
      />
    )
  }
  if (role === 'group_admin') {
    secondaryHeaderItems = secondaryHeaderItems.concat([
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Link color='white' size='small' />}
        label='Copy Join Link'
        message='Join Link Copied!'
        textToCopy={`https://www.zooniverse.org/groups/${group.id}?join_token=${group.join_token}`}
      />,
      <HeaderToast
        key='share-group-toast'
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        textToCopy={`zooniverse.org/groups/${group.id}`}
      />,
      <HeaderButton
        key='manage-group-button'
        icon={<SettingsOption color='white' size='small' />}
        label='Manage Group'
        onClick={() => alert('Coming soon!')}
      />
    ])
  }

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
        <ContentBox
          title='Top Contributors'
        >
          Top contributors go here.
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
  login: string,
  role: string
}

export default GroupStats
