import { Box, Tab } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  dateRanges
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select,
  Tabs
} from '@shared'

const DEFAULT_HANDLER = () => true
const DEFAULT_USER = {
  avatar_src: '',
  display_name: '',
  login: ''
}

function MainContent ({
  handleDateRangeSelect = DEFAULT_HANDLER,
  handleProjectSelect = DEFAULT_HANDLER,
  projects = [],
  selectedDateRange = dateRanges.last7Days,
  selectedProject = 'AllProjects',
  stats = [],
  user = DEFAULT_USER
}) {
  const [activeTab, setActiveTab] = useState(0)

  function onActive (index) {
    setActiveTab(index)
  }
  
  const hoursSpent = stats?.time_spent >= 0 ? stats.time_spent / 3600 : 0

  // create project options
  let projectOptions = [
    { label: 'ALL PROJECTS', value: 'AllProjects' },
    ...(projects || []).map(project => ({
      label: project.display_name,
      value: project.id
    }))
  ];
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
      gap='32px'
      height='32rem'
    >
      <ProfileHeader
        avatar={user?.avatar_src}
        classifications={activeTab === 0 ? stats?.total_count : undefined}
        displayName={user?.display_name}
        hours={activeTab === 1 ? hoursSpent : undefined}
        login={user?.login}
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
  user: shape({
    avatar_src: string,
    display_name: string,
    login: string
  })
}

export default MainContent
