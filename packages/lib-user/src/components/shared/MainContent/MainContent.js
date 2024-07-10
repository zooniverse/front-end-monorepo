import { MovableModal } from '@zooniverse/react-components'
import { Box, Calendar, ResponsiveContext } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useCallback, useContext, useEffect, useState } from 'react'

import {
  convertStatsSecondsToHours
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select
} from '@components/shared'

import { StyledButton, StyledTab } from './components'
import { getDateRangeSelectOptions, getProjectSelectOptions } from './helpers'

const DEFAULT_HANDLER = () => true
const DEFAULT_DATE_RANGE = {
  endDate: null,
  startDate: null
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
  const [showCalendar, setShowCalendar] = useState(false)
  const [customDateRange, setCustomDateRange] = useState([selectedDateRange.startDate, selectedDateRange.endDate])
  
  const handleActiveTab = useCallback((tabIndex) => {
    setActiveTab(tabIndex)
  }, [])

  useEffect(function updateCustomDateRange() {
    setCustomDateRange([selectedDateRange.startDate, selectedDateRange.endDate])
  }, [selectedDateRange])
  
  const size = useContext(ResponsiveContext)

  const hoursSpent = convertStatsSecondsToHours(stats?.time_spent)

  const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({ created_at: source?.created_at?.substring(0, 10), selectedDateRange })
  
  const { projectOptions, selectedProjectOption } = getProjectSelectOptions({ projects, selectedProject })
  
  const todayUTC = new Date().toISOString().substring(0, 10)

  function handleDateRangeSelect(option) {
    if (option.value === 'custom') {
      setShowCalendar(true)
      return
    }

    setSelectedDateRange({
      endDate: null,
      startDate: option.value
    })
  }

  function handleCalendarClose() {
    setSelectedDateRange({
      endDate: customDateRange[1]?.substring(0, 10),
      startDate: customDateRange[0]?.substring(0, 10)
    })
    setShowCalendar(false)
  }

  function handleCalendarSelect(date) {
    if (!date || date?.length === 0) {
      return
    }
    setCustomDateRange(date[0])
  }

  function handleProjectSelect(option) {
    setSelectedProject(option.value)
  }
  
  return (
    <>
      <MovableModal
        active={showCalendar}
        closeFn={handleCalendarClose}
        position='top'
        title='Custom Date Range'
      >
        <Calendar
          bounds={[
            (source?.created_at?.substring(0, 10) || '2015-07-01'),
            todayUTC
          ]}
          date={[customDateRange]}
          onSelect={handleCalendarSelect}
          range='array'
        />
      </MovableModal>
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
    </>
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
