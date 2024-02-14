'use client'

import { Box, Tab, Tabs } from 'grommet'
import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesUser,
  useUserStats
} from '@hooks'

import dateRanges from '../../utils/dateRanges'

import Layout from '../shared/Layout/Layout'
import ContentBox from '../shared/ContentBox/ContentBox'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'
import Select from '../shared/Select/Select'

const DEFAULT_PROJECT = {
  label: 'ALL PROJECTS',
  value: 'AllProjects'
}

const DEFAULT_DATE_RANGE = {
  label: 'LAST 7 DAYS',
  value: 'Last7Days'
}

function UserStats ({
  authClient,
  login = ''
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedProject, setSelectedProject] = useState(DEFAULT_PROJECT)
  const [selectedDateRange, setSelectedDateRange] = useState(DEFAULT_DATE_RANGE)

  let projectIDs = []

  const { data: user, error, isLoading } = usePanoptesUser(authClient)
  const { data: userStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id })

  function onActive (index) {
    setActiveTab(index)
  }

  function handleProjectSelect (project) {
    setSelectedProject(project)
  }

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange)
  }

  if (userStats?.project_contributions?.length > 0) {
    projectIDs = userStats.project_contributions.map(project => project.project_id)
  }

  let projectOptions = []
  if (projectIDs?.length > 0) {
    projectOptions = projectIDs.map(projectID => ({
      label: projectID.toString(),
      value: projectID.toString()
    }))
    projectOptions.unshift(DEFAULT_PROJECT)
  }
  
  const dateRangeOptions = dateRanges.values.map((dateRange) => ({
    label: dateRange
      .replace(/([A-Z])/g, ' $1')
      .replace(/([0-9]+)/g, ' $1')
      .toUpperCase()
      .trim(),
    value: dateRange.value
  }))

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
          projects={userStats?.project_contributions?.length}
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
              value={selectedProject}
            />
            <Select
              id='date-range-select'
              name='date-range-select'
              handleChange={handleDateRangeSelect}
              options={dateRangeOptions}
              value={selectedDateRange}
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
