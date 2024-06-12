import { Box, Tab } from 'grommet'
import Link from 'next/link'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  convertStatsSecondsToHours,
  dateRanges
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select,
  Tabs
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
        <Tab title='HOURS' style={{ marginRight: 'auto' }}>
          <Box width='100%' height='15rem'>
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type='session_time'
            />
          </Box>
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
      {source?.login ? (
        <Box
          direction='row'
          gap='16px'
          justify='end'
        >
          <Link href={`/users/${source.login}/stats/certificate`}>
            Generate Volunteer Certificate
          </Link>
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
