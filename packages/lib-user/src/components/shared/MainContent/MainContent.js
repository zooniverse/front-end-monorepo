import { Box, Button, ResponsiveContext } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useCallback, useContext, useState } from 'react'
import styled, { css } from 'styled-components'

import {
  convertStatsSecondsToHours,
  getDateRangeSelectOptions
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select
} from '@components/shared'

import { StyledButton, StyledTab } from './components'

const DEFAULT_HANDLER = () => true
const DEFAULT_DATE_RANGE = {
  endDate: '',
  startDate: ''
}
const DEFAULT_STATS = {
  data: [],
  time_spent: 0,
  total_count: 0
}
const DEFAULT_SOURCE = {
  id: '',
  display_name: '',
}

function MainContent({
  projects = [],
  selectedDateRange = DEFAULT_DATE_RANGE,
  selectedProject = 'AllProjects',
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER,
  stats = DEFAULT_STATS,
  source = DEFAULT_SOURCE
}) {
  const [activeTab, setActiveTab] = useState(0)
  const handleActiveTab = useCallback((tabIndex) => {
    setActiveTab(tabIndex)
  }, [])

  const size = useContext(ResponsiveContext)

  const hoursSpent = convertStatsSecondsToHours(stats?.time_spent)

  // create project options
  let projectOptions = [
    { label: 'ALL PROJECTS', value: 'AllProjects' },
    ...(projects || []).map(project => ({
      label: project.display_name,
      value: project.id
    }))
  ]
  const selectedProjectOption = projectOptions.find(option => option.value === selectedProject)

  // create date range options
  const dateRangeOptions = getDateRangeSelectOptions(source?.created_at?.substring(0, 10))
  const todayUTC = new Date().toISOString().substring(0, 10)
  let selectedDateRangeOption = dateRangeOptions.find(option =>
    (selectedDateRange.endDate === todayUTC) &&
    (option.value === selectedDateRange.startDate)
  )

  function handleDateRangeSelect(option) {
    setSelectedDateRange({
      endDate: todayUTC,
      startDate: option.value
    })
  }

  function handleProjectSelect(option) {
    setSelectedProject(option.value)
  }
  
  return (
    <ContentBox
      direction='column'
      gap='medium'
      height={{ min: '32rem'}}
    >
      <ProfileHeader
        avatar={source?.avatar_src}
        classifications={activeTab === 0 ? stats?.total_count : undefined}
        displayName={source?.display_name}
        hours={activeTab === 1 ? hoursSpent : undefined}
        login={source?.login}
        projects={selectedProject === 'AllProjects' ? projects?.length : 1}
      />
      <Box
        direction={size === 'small' ? 'column' : 'row'}
        gap={size === 'small' ? 'small' : 'none'}
      >
        <Box
          role='tablist'
          basis='1/2'
          direction='row'
          fill={size === 'small' ? 'horizontal' : false}
          gap='medium'
        >
          <StyledTab
            role='tab'
            aria-expanded={activeTab === 0}
            aria-selected={activeTab === 0}
            active={activeTab === 0}
            label='CLASSIFICATIONS'
            onClick={() => handleActiveTab(0)}
            plain
            fill={size === 'small' ? 'horizontal' : false}
          />
          <StyledTab
            role='tab'
            aria-expanded={activeTab === 1}
            aria-selected={activeTab === 1}
            active={activeTab === 1}
            label='HOURS'
            onClick={() => handleActiveTab(1)}
            plain
            fill={size === 'small' ? 'horizontal' : false}
          />
        </Box>
        <Box
          basis='1/2'
          direction='row'
          fill={size === 'small' ? 'horizontal' : false}
          gap='small'
          justify={size === 'small' ? 'evenly' : 'end'}
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
      <Box
        role='tabpanel'
        aria-label={activeTab === 0 ? 'CLASSIFICATIONS Tab Contents' : 'HOURS Tab Contents'}
        height='15rem'
        width='100%'
      >
        <BarChart
          data={stats?.data}
          dateRange={selectedDateRange}
          type={activeTab === 0 ? 'count' : 'session_time'}
        />
      </Box>
      {source?.login ? (
        <Box
          direction='row'
          justify='end'
          margin={{ top: 'small' }}
        >
          <StyledButton
            forwardedAs='a'
            color='neutral-1'
            href={`/users/${source.login}/stats/certificate${window.location.search}`}
            label='Generate Volunteer Certificate'
          />
        </Box>
      ) : null}
    </ContentBox>
  )
}

MainContent.propTypes = {
  activeTab: number,
  onActive: func,
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func,
  stats: shape({
    data: arrayOf(shape({
      count: number,
      period: string,
      session_time: number
    })),
    time_spent: number,
    total_count: number
  }),
  source: shape({
    created_at: string,
    display_name: string
  })
}

export default MainContent
