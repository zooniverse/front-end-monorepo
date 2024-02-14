'use client'

import { Box, Tab, Tabs } from 'grommet'
import { object, string } from 'prop-types'
import { useState } from 'react'

import {
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
  let projectIDs = []

  const statsQuery = getStatsQueryFromDateRange(selectedDateRange)
  if (selectedProject !== 'AllProjects') {
    delete statsQuery.project_contributions
    statsQuery.project_id = parseInt(selectedProject)
    projectIDs = [selectedProject]
  }

  const { data: user, error, isLoading } = usePanoptesUser(authClient)
  const { data: userStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id, query: statsQuery })

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
  if (userStats?.project_contributions?.length > 0) {
    projectIDs = userStats.project_contributions.map(project => project.project_id)
  }
  let projectOptions = []
  if (projectIDs?.length > 0) {
    projectOptions = projectIDs.map(projectID => ({
      label: projectID.toString(),
      value: projectID.toString()
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

  return (
    <Layout>
      <ContentBox
        direction='column'
        gap='32px'
        height='512px'
      >
        <ProfileHeader
          avatar={user?.avatar_src}
          classifications={activeTab === 0 ? userStats?.total_count : undefined}
          displayName={user?.display_name}
          hours={activeTab === 1 ? (userStats?.time_spent / 3600) : undefined}
          login={login}
          projects={projectIDs?.length}
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
