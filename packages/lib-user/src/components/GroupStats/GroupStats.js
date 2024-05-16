import ProjectCard from '@zooniverse/react-components/ProjectCard'
import { Grid } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  useStats
} from '@hooks'

import {
  getDateInterval
} from '@utils'

import {
  ContentBox,
  Layout,
  MainContent
} from '@components/shared'

import getHeaderItems from './helpers/getHeaderItems'
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
