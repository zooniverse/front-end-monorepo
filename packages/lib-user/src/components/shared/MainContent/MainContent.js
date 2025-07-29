import { Loader, Modal, MovableModal, SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Calendar, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation, Trans } from '../../../translations/i18n.js'

import {
  convertStatsSecondsToHours,
  getStatsDateString
} from '@utils'

import {
  BarChart,
  ContentBox,
  ProfileHeader,
  Select,
  Tip
} from '@components/shared'

import {
  StyledCalendarButton,
  StyledCertificateButton,
  StyledTab
} from './components'
import { getDateRangeSelectOptions, getProjectSelectOptions } from './helpers'


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
  error = undefined,
  loading = false,
  paramsValidationMessage = '',
  projects = [],
  selectedDateRange,
  selectedProject = undefined,
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER,
  stats = DEFAULT_STATS,
  source = DEFAULT_SOURCE,
  totalProjects = 0
}) {
  const { t } = useTranslation()
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
  
  const CalendarModal = size === 'small' ? Modal : MovableModal

  const hoursSpent = convertStatsSecondsToHours(stats?.time_spent)

  const noStats = !stats?.data?.length

  const sourceCreatedAtDate = getStatsDateString(source?.created_at)

  const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
    sourceCreatedAtDate,
    paramsValidationMessage,
    selectedDateRange,
    t
  })

  const { projectOptions, selectedProjectOption } = getProjectSelectOptions({ projects, selectedProject, t })

  const todayUTC = getStatsDateString(new Date())

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
    setCustomDateRange([selectedDateRange.startDate, selectedDateRange.endDate])
    setShowCalendar(false)
  }

  function handleCalendarSave() {
    setSelectedDateRange({
      endDate: getStatsDateString(customDateRange[1]),
      startDate: getStatsDateString(customDateRange[0])
    })
    setShowCalendar(false)
  }

  function handleCalendarChange(date) {
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
      <CalendarModal
        active={showCalendar}
        closeFn={handleCalendarClose}
        pad='none'
        position='top'
        rndProps={{ cancel: '.element-that-ignores-drag-actions' }}
        title={t('MainContent.calendarTitle')}
      >
        <Box
          align='center'
          className='element-that-ignores-drag-actions'
          fill
          pad={{
            bottom: 'medium',
            horizontal: size === 'small' ? 'none' : 'medium',
            top: 'small'
          }}
        >
          <Box>
            <Calendar
              bounds={[
                sourceCreatedAtDate,
                todayUTC
              ]}
              date={[customDateRange]}
              onSelect={handleCalendarChange}
              range='array'
            />
            <Box
              direction='row'
              fill
              justify='end'
              margin={{ top: 'small' }}
              pad={{ horizontal: size === 'small' ? 'small' : 'none' }}
            >
              <StyledCalendarButton
                label={t('MainContent.calendarBtn')}
                onClick={handleCalendarSave}
              />
            </Box>
          </Box>
        </Box>
      </CalendarModal>
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
          projects={selectedProject ? 1 : totalProjects}
        />
        <Box
          direction={size === 'small' ? 'column' : 'row'}
          gap={size === 'small' ? 'small' : 'none'}
        >
          <Box
            align='baseline'
            basis='1/2'
            direction='row'
            gap='xsmall'
          >
            <Box
              role='tablist'
              direction='row'
              fill={size === 'small' ? 'horizontal' : false}
              gap='medium'
            >
              <StyledTab
                role='tab'
                aria-expanded={activeTab === 0}
                aria-selected={activeTab === 0}
                active={activeTab === 0}
                label={t('common.classifications')}
                onClick={() => handleActiveTab(0)}
                plain
                fill={size === 'small' ? 'horizontal' : false}
              />
              <StyledTab
                role='tab'
                aria-expanded={activeTab === 1}
                aria-selected={activeTab === 1}
                active={activeTab === 1}
                label={t('common.hours')}
                onClick={() => handleActiveTab(1)}
                plain
                fill={size === 'small' ? 'horizontal' : false}
              />
            </Box>
            <Tip
              contentText={t('MainContent.hoursTip')}
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
              aria-label={t('MainContent.selectProject')}
              handleChange={handleProjectSelect}
              options={projectOptions}
              value={selectedProjectOption}
            />
            <Select
              id='date-range-select'
              name='date-range-select'
              aria-label={t('MainContent.selectDateRange')}
              handleChange={handleDateRangeSelect}
              options={dateRangeOptions}
              value={selectedDateRangeOption}
            />
          </Box>
        </Box>
        <Box
          role='tabpanel'
          aria-label={activeTab === 0 ? `${t('common.classifications')} ${t('MainContent.tabContents')}` : `${t('common.hours')} ${t('MainContent.tabContents')}`}
          height='15rem'
          width='100%'
        >
          {paramsValidationMessage ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <SpacedText uppercase={false}>{paramsValidationMessage}</SpacedText>
            </Box>
          ) : loading ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <Loader />
            </Box>
          ) : error ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <SpacedText uppercase={false}>
                {t('MainContent.error')}
              </SpacedText>
              <SpacedText uppercase={false}>
                {error?.message}
              </SpacedText>
            </Box>
          ) : noStats ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <Text>{t('MainContent.noData')}</Text>
              <Text>
                <Trans
                  i18nKey='MainContent.start'
                  components={[
                    <Anchor
                      key='projects-page'
                      href='https://www.zooniverse.org/projects'
                    />
                  ]}
                />
              </Text>
            </Box>
          ) : (
            <BarChart
              data={stats?.data}
              dateRange={selectedDateRange}
              type={activeTab === 0 ? 'count' : 'session_time'}
            />
          )}
        </Box>
        {source?.login ? (
          <Box
            direction='row'
            justify={size === 'small' ? 'center': 'end'}
            margin={{ top: 'small' }}
          >
            <StyledCertificateButton
              forwardedAs={Link}
              color='neutral-1'
              href={`/users/${source.login}/stats/certificate${window.location.search}`}
              label={t('MainContent.certificate')}
            />
          </Box>
        ) : null}
      </ContentBox>
    </>
  )
}

MainContent.propTypes = {
  loading: bool,
  paramsValidationMessage: string,
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }).isRequired,
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
  }),
  totalProjects: number
}

export default MainContent
