'use client'

import { Box, Tab, Tabs } from 'grommet'
import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useUserStats
} from '@hooks'

import {
  dateRanges,
  getStatsQueryFromDateRange
} from '@utils'

import BarChart from '../shared/BarChart/BarChart'
import ContentBox from '../shared/ContentBox/ContentBox'
import Layout from '../shared/Layout/Layout'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'
import ProjectCard from '../shared/ProjectCard/ProjectCard'
import Select from '../shared/Select/Select'

function UserStats ({
  authClient,
  login = ''
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch user
  const { data: user, error, isLoading } = usePanoptesUser(authClient)
  
  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getStatsQueryFromDateRange(selectedDateRange)
  allProjectsStatsQuery.project_contributions = true
  allProjectsStatsQuery.time_spent = true
  
  const { data: allProjectsStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id, query: allProjectsStatsQuery })
  
  // fetch individual project stats
  const projectStatsQuery = getStatsQueryFromDateRange(selectedDateRange)
  projectStatsQuery.project_id = parseInt(selectedProject)
  projectStatsQuery.time_spent = true
  
  const { data: projectStats, error: projectStatsError, isLoading: projectStatsLoading } = useUserStats({ authClient, userID: user?.id, query: projectStatsQuery })
  
  // fetch projects
  const projectIDs = allProjectsStats?.project_contributions?.map(project => project.project_id)
  
  const { data: projects, error: projectsError, isLoading: projectsLoading } = usePanoptesProjects(projectIDs)

  function onActive (index) {
    setActiveTab(index)
  }

  function handleProjectSelect (project) {
    setSelectedProject(project.value)
  }

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  // create project options
  let projectOptions = []
  if (projects?.length > 0) {
    projectOptions = projects.map(project => ({
      label: project.display_name.toUpperCase(),
      value: project.id
    }))
    projectOptions.unshift({ label: 'ALL PROJECTS', value: 'AllProjects'})
  }
  const selectedProjectOption = projectOptions.find(option => option.value === selectedProject)
  
  // create date range options
  const dateRangeOptions = dateRanges.values.map((dateRange) => ({
    label: dateRange
      .replace(/([A-Z])/g, ' $1')
      .replace(/([0-9]+)/g, ' $1')
      .toUpperCase()
      .trim(),
    value: dateRange
  }))
  const selectedDateRangeOption = dateRangeOptions.find(option => option.value === selectedDateRange)

  // set stats based on selected project or all projects
  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  // determine top projects per date range
  let topProjects = []
  if (allProjectsStats?.project_contributions?.length > 0) {
    topProjects = allProjectsStats.project_contributions
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
  }

  return (
    <Layout>
      <ContentBox
        direction='column'
        gap='32px'
        height='32rem'
      >
        <ProfileHeader
          avatar={user?.avatar_src}
          classifications={activeTab === 0 ? stats?.total_count : undefined}
          displayName={user?.display_name}
          hours={activeTab === 1 ? (stats?.time_spent / 3600) : undefined}
          login={login}
          projects={selectedProject === 'AllProjects' ? projects?.length : 1}
        />
        <Tabs
          activeIndex={activeTab}
          flex
          gap='16px'
          onActive={onActive}
          justify='start'
        >
          <Tab title='CLASSIFICATIONS'>
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type='count'
            />
          </Tab>
          <Tab title='HOURS' style={{ marginRight: 'auto' }}>
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type='session_time'
            />
          </Tab>
          {/* TODO: add info button */}
          <Box
            direction='row'
            gap='xsmall'
          >
            <Select
              id='project-select'
              name='project-select'
              handleChange={handleProjectSelect}
              options={projectOptions}
              value={selectedProjectOption}
            />
            <Select
              id='date-range-select'
              name='date-range-select'
              handleChange={handleDateRangeSelect}
              options={dateRangeOptions}
              value={selectedDateRangeOption}
            />
          </Box>
        </Tabs>
        <Box
          direction='row'
          gap='16px'
          justify='end'
          margin={{ top: 'small'}}
        >
          <button type='button' onClick={() => alert('Coming soon!')}>Export Stats</button>
          <button type='button' onClick={() => alert('Coming soon!')}>Generate Volunteer Certificate</button>
        </Box>
      </ContentBox>
      <ContentBox
        linkLabel='See more'
        linkProps={{ href: 'https://www.zooniverse.org/projects' }}
        title='Top Projects'
      >
        <Box
          direction='row'
          gap='small'
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
          overflow={{ horizontal: 'auto' }}
        >
          {topProjects.map(projectStats => {
            const project = projects?.find(project => project.id === projectStats.project_id.toString())
            
            if (!project) return null

            return (
              <ProjectCard
                key={projectStats.project_id}
                description={project?.description}
                displayName={project?.display_name}
                href={`https://www.zooniverse.org/projects/${project?.slug}`}
                imageSrc={project?.avatar_src}                
              />
            )
          })}
        </Box>
      </ContentBox>
    </Layout>
  )
}

UserStats.propTypes = {
  authClient: object,
  login: string
}

export default UserStats
