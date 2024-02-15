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

import Layout from '../shared/Layout/Layout'
import ContentBox from '../shared/ContentBox/ContentBox'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'
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

  const stats = selectedProject === 'AllProjects' ? allProjectsStats : projectStats

  return (
    <Layout>
      <ContentBox
        direction='column'
        gap='32px'
        height='512px'
      >
        <ProfileHeader
          avatar={user?.avatar_src}
          classifications={activeTab === 0 ? stats?.total_count : undefined}
          displayName={user?.display_name}
          hours={activeTab === 1 ? (stats?.time_spent / 3600) : undefined}
          login={login}
          projects={selectedProject === 'AllProjects' ? projects?.length : 1}
        />
        <Box
          direction='row'
          gap='32px'
          justify='between'
        >
          <Box
            direction='row'
            gap='32px'
          >
            {/* TODO: refactor with lib-user Tabs component */}
            <Tabs
              activeIndex={activeTab}
              justify='start'
              onActive={onActive}
            >
              <Tab title='CLASSIFICATIONS'>
                <Box>Classification bar chart goes here.</Box>
              </Tab>
              <Tab title='HOURS'>
                <Box>Hours bar chart goes here.</Box>
              </Tab>
            </Tabs>
            {/* TODO: add info button */}
          </Box>
          <Box
            direction='row'
            gap='32px'
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
