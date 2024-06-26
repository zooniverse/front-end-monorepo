import { Box, Button, Tab } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import {
  convertStatsSecondsToHours,
  dateRanges
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select,
  Tabs,
  Tip
} from '@components/shared'

const DEFAULT_HANDLER = () => true
const DEFAULT_STATS = {
  data: [],
  time_spent: 0,
  total_count: 0
}
const DEFAULT_SOURCE = {
  id: '',
  display_name: '',
}

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.global.colors['neutral-1']};
  border-radius: 4px;
  color: ${props => props.theme.global.colors['neutral-6']};
`

function MainContent({
  handleDateRangeSelect = DEFAULT_HANDLER,
  handleProjectSelect = DEFAULT_HANDLER,
  projects = [],
  selectedDateRange = dateRanges.last7Days,
  selectedProject = 'AllProjects',
  stats = DEFAULT_STATS,
  source = DEFAULT_SOURCE
}) {
  const [activeTab, setActiveTab] = useState(0)

  function onActive (index) {
    setActiveTab(index)
  }

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
      <Tabs
        activeIndex={activeTab}
        flex
        gap='small'
        onActive={onActive}
        justify='start'
      >
        <Tab title='CLASSIFICATIONS'>
          <Box width='100%' height='15rem'>
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type='count'
              />
          </Box>
        </Tab>
        <Tab title='HOURS' >
          <Box width='100%' height='15rem'>
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type='session_time'
            />
          </Box>
        </Tab>
        <Tip
          buttonProps={{
            margin: {
              bottom: 'small',
              right: 'auto'
            }
          }}
          contentText='Hours are calculated based on the start and end times of your classification efforts. Hours do not reflect your time spent on Talk.'
        />
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
      {source?.login ? (
        <Box
          direction='row'
          gap='16px'
          justify='end'
        >
          <StyledButton
            forwardedAs='a'
            color='neutral-1'
            href={`/users/${source.login}/stats/certificate`}
            label='Generate Volunteer Certificate'
          />
        </Box>
      ) : null}
    </ContentBox>
  )
}

MainContent.propTypes = {
  activeTab: number,
  handleDateRangeSelect: func,
  handleProjectSelect: func,
  onActive: func,
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  selectedDateRange: string,
  selectedProject: string,
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
    display_name: string
  })
}

export default MainContent
