import { useQueryState } from 'nuqs'
import { arrayOf, shape, string } from 'prop-types'
import { observer, MobXProviderContext } from 'mobx-react'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Heading, Select, ResponsiveContext, Text, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'

import ContentBox from '@shared/components/ContentBox'
import BarChart from '../BarChart/BarChart'
import CustomCalendar from './CustomCalendar'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'
import StyledTab from './StyledTab'
import selectTheme from './selectTheme'

import { getDateInterval } from '../../helpers/getDateInterval'
import getDateRangeSelectOptions from '../../helpers/getDateRangeOptions'
import getStatsDateString from '../../helpers/getStatsDateString'
import validateDateRangeParams from '../../helpers/validateDateRangeParams'
import useProjectStats from '../../helpers/useProjectStats'

const StyledSelect = styled(Select)`
  text-align: center;
  text-transform: uppercase;
`

const Relative = styled(Box)`
  position: relative;
  border: red solid 1px;
`

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    launchDate: project?.launch_date,
    projectDisplayName: project?.display_name,
    projectId: project?.id
  }
}

function ChartContainer({ workflows }) {
  const { i18n, t } = useTranslation('screens')
  const locale = i18n.language === 'test' ? 'en' : i18n.language

  const { launchDate, projectDisplayName, projectId } = useStores()

  const size = useContext(ResponsiveContext)

  const today = new Date()
  const todayUTC = getStatsDateString(today)

  const dateRangeOptions = getDateRangeSelectOptions(launchDate, t)

  const workflowOptions = workflows.map(workflow => {
    return {
      value: workflow.id,
      label: workflow.displayName.toUpperCase()
    }
  })
  workflowOptions.push({ value: null, label: 'All Workflows' })

  /* NUQS Handling */
  const searchParams = useSearchParams()

  // This seems redundant with nuqs enabled, but if a user visits this page
  // with searchParams already in place, the first render and data fetch
  // must match those initial search params. If absent, only then set the default last7Days
  const startDateParam = searchParams.get('start_date')
  const endDateParam = searchParams.get('end_date')

  const [startDate, setStartDate] = useQueryState('start_date', {
    defaultValue: startDateParam ? startDateParam : dateRangeOptions[0].value // last7Days
  })
  const [endDate, setEndDate] = useQueryState('end_date', {
    defaultValue: endDateParam ? endDateParam : todayUTC
  })
  const [type, setType] = useQueryState('type', { defaultValue: 'count' })
  const [workflow, setWorkflow] = useQueryState('workflow_id')

  /* BarChart Logic */
  const { dateRangeMessage } = validateDateRangeParams({ endDate, startDate })

  let selectedDateRangeOption = dateRangeOptions.find(
    option => endDate === todayUTC && option.value === startDate
  )

  const selectedWorkflowOption = workflowOptions.find(option => workflow === option.value)

  // Handle label for a custom selected date range
  const formatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }
  if (!selectedDateRangeOption && !dateRangeMessage) {
    const formattedStartDate = new Intl.DateTimeFormat(locale, formatOptions).format(
      new Date(startDate)
    )
    const formattedEndDate = new Intl.DateTimeFormat(locale, formatOptions).format(
      new Date(endDate)
    )
    const customDateRangeOption = {
      label: `${formattedStartDate} - ${formattedEndDate}`,
      value: 'custom'
    }
    dateRangeOptions.push(customDateRangeOption)
    selectedDateRangeOption = customDateRangeOption
  } else {
    dateRangeOptions.push({
      label: t('ProjectStats.BarChart.dateRange.custom').toUpperCase(),
      value: 'custom'
    })
  }

  /* ERAS Query */
  const dateInterval = getDateInterval({ endDate, startDate })
  const erasQuery = {
    end_date: endDate ? endDate : undefined,
    period: dateInterval.period,
    project_id: workflow ? undefined : projectId,
    start_date: startDate ? startDate : undefined,
    workflow_id: workflow || undefined
  }

  // remove undefined params before the API request
  const filteredQuery = Object.fromEntries(
    Object.entries(erasQuery).filter(([_, value]) => value !== undefined)
  )

  const { data, error, isLoading, isValidating } = useProjectStats(filteredQuery, type)
  const loadingOrValidating = isLoading || isValidating


  /* Custom Calendar visibility */
  const [showCalendar, setShowCalendar] = useState(false)

  /* Select handler functions */
  function handleDateRangeSelect(option) {
    if (option.value === 'custom') {
      setShowCalendar(true)
      return
    }
    setEndDate(todayUTC)
    setStartDate(option.value)
  }

  function handleWorkflowSelect(option) {
    setWorkflow(option.value)
  }

  function handleTypeChange(value) {
    if (value === 'comments') {
      setType('comments')
      setWorkflow(null)
    } else {
      setType('count')
    }
  }

  return (
    <>
      <CustomCalendar
        defaultStartDate={dateRangeOptions[0].value}
        launchDate={launchDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setShowCalendar={setShowCalendar}
        showCalendar={showCalendar}
      />
      <ContentBox>
        <Box direction='row' justify='between'>
          <Heading level={2}>{projectDisplayName} Statistics</Heading>
          <Box align='center'>
            <SpacedText
              color={{ dark: 'neutral-6', light: 'dark-4' }}
              uppercase={false}
              size='1rem'
            >
              {t(`ProjectStats.${type}`)}
            </SpacedText>
            <SpacedText color={{ dark: 'accent-1', light: 'neutral-1' }} size='xxlarge'>
              {loadingOrValidating ? (
                <Loader height='2.5rem' width='2rem' />
              ) : dateRangeMessage || error?.message ? (
                <Box height='2.5rem' />
              ) : (
                <span>{data?.['total_count']}</span>
              )}
            </SpacedText>
          </Box>
        </Box>
        <Box
          role='tablist'
          direction='row'
          fill={size === 'small' ? 'horizontal' : false}
          gap='medium'
        >
          <StyledTab
            role='tab'
            aria-expanded={type === 'count'}
            aria-selected={type === 'count'}
            active={type === 'count'}
            label={t('ProjectStats.count')}
            onClick={() => handleTypeChange('count')}
            plain
            fill={size === 'small' ? 'horizontal' : false}
          />
          <StyledTab
            role='tab'
            aria-expanded={type === 'comments'}
            aria-selected={type === 'comments'}
            active={type === 'comments'}
            label={t('ProjectStats.comments')}
            onClick={() => handleTypeChange('comments')}
            plain
            fill={size === 'small' ? 'horizontal' : false}
          />
        </Box>
        <ThemeContext.Extend value={selectTheme}>
          <Box
            basis='1/2'
            direction='row'
            fill={size === 'small' ? 'horizontal' : false}
            gap='20px'
            justify={size === 'small' ? 'evenly' : 'end'}
          >
            <StyledSelect
              name='workflow-select'
              aria-label={t('ProjectStats.selectWorkflow')}
              labelKey='label'
              onChange={({ option }) => handleWorkflowSelect(option)}
              options={workflowOptions}
              value={selectedWorkflowOption?.label}
              valueKey={{ key: 'label', reduce: true }}
              size='medium'
              disabled={type === 'comments'}
            />
            <StyledSelect
              name='date-range-select'
              aria-label={t('ProjectStats.selectDateRange')}
              labelKey='label'
              onChange={({ option }) => handleDateRangeSelect(option)}
              options={dateRangeOptions}
              value={selectedDateRangeOption?.label}
              valueKey={{ key: 'label', reduce: true }}
              size='medium'
            />
          </Box>
        </ThemeContext.Extend>
        <Relative height='medium' margin={{ bottom: 'medium' }}>
          {loadingOrValidating ? (
            <LoadingPlaceholder />
          ) : dateRangeMessage || error?.message ? (
            <ErrorPlaceholder message={dateRangeMessage || error?.message} />
          ) : null}
          <BarChart data={data?.data} dateRange={{ startDate, endDate }} type={type} />
        </Relative>
      </ContentBox>
    </>
  )
}

export default observer(ChartContainer)

ChartContainer.propTypes = {
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}
