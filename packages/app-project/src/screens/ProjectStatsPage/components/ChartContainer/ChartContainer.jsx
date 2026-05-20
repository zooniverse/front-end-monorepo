import { useQueryState } from 'nuqs'
import { arrayOf, shape, string } from 'prop-types'
import { observer, MobXProviderContext } from 'mobx-react'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Heading, Select, ResponsiveContext, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'

import ContentBox from '@shared/components/ContentBox'
import BarChart from '../BarChart/BarChart'
import CustomDateRange from './CustomDateRange'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'
import StyledTab from './StyledTab'
import selectTheme from './selectTheme'
import Avatar from '@components/ProjectHeader/components/Avatar/Avatar'

import { getDateInterval } from '../../helpers/getDateInterval'
import getDateRangeSelectOptions from '../../helpers/getDateRangeOptions'
import getStatsDateString from '../../helpers/getStatsDateString'
import validateDateRangeParams from '../../helpers/validateDateRangeParams'
import useProjectStats from '../../helpers/useProjectStats'

const StyledHeading = styled(Heading)`
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  align-items: center;
`

const StyledSelect = styled(Select)`
  text-align: center;
  text-transform: uppercase;
`

const Relative = styled(Box)`
  position: relative;
`

// for stacked or inline Selects
const StyledBox = styled(Box)`
  flex-direction: row;
  column-gap: 20px;

  @media (width < 500px) {
    align-items: center;
    flex-direction: column;
    row-gap: 10px;
  }
`

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    createdAtDate: project?.created_at,
    launchDate: project?.launch_date,
    projectDisplayName: project?.display_name,
    projectId: project?.id
  }
}

function ChartContainer({ workflows }) {
  const { i18n, t } = useTranslation('screens')
  const locale = i18n.language === 'test' ? 'en' : i18n.language
  const size = useContext(ResponsiveContext)

  const { createdAtDate, launchDate, projectDisplayName, projectId } = useStores()

  // The custom date range UI needs bounds and the "All Time" option is calculated from this
  const displayedLaunchDate = launchDate ? launchDate : createdAtDate

  const today = new Date()
  const todayUTC = getStatsDateString(today)

  const dateRangeOptions = getDateRangeSelectOptions(displayedLaunchDate, t)

  const workflowOptions = workflows.map(workflow => {
    return {
      value: workflow.id,
      label: workflow.displayName.toUpperCase()
    }
  })
  workflowOptions.unshift({ value: null, label: t('ProjectStats.BarChart.allWorkflows') })

  /* NUQS Handling  */
  const [startDate, setStartDate] = useQueryState('start_date')
  const [endDate, setEndDate] = useQueryState('end_date')
  const [type, setType] = useQueryState('type')
  const [workflow, setWorkflow] = useQueryState('workflow_id')

  /*
    If this page is rendered with query params already in the URL, we must use those
    instead of defaults. This page is dynamically rendered with getServerSideProps so searchParams
    are available via useSearchParams() right away. In the future, this strategy can be refactored
    to use server-side data fetching in the App Router via searchParams like how the /projects page
    does in app-root.
  */
  const searchParams = useSearchParams()

  useEffect(function onMount() {
    // check if there's already a date range in the URL
    const startDateParam = searchParams.get('start_date')
    const endDateParam = searchParams.get('end_date')

    if (startDateParam) {
      setStartDate(startDateParam)
    } else {
      setStartDate(dateRangeOptions?.[0].value) // Last 7 Days
    }

    if (endDateParam) {
      setEndDate(endDateParam)
    } else {
      setEndDate(todayUTC)
    }

    // check if there's a workflow_id
    const workflowIdParam = searchParams.get('workflow_id')
    if (workflowIdParam) {
      setWorkflow(workflowIdParam)
    }

    // check if there's a type
    const typeParam = searchParams.get('type')
    if (typeParam) {
      setType(typeParam)
    } else {
      setType('count')
    }
  }, [])


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
    period: dateInterval?.period,
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
  const errorMessage = dateRangeMessage || error?.message

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

  /* Custom Date Range modal visibility */
  const [showCalendar, setShowCalendar] = useState(false)

  const smallScreen = size === 'small'

  return (
    <>
      <CustomDateRange
        endDate={endDate}
        launchDate={displayedLaunchDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setShowCalendar={setShowCalendar}
        showCalendar={showCalendar}
        startDate={startDate}
      />
      <ContentBox fill border={{ size: smallScreen ? '0' : 'thin' }}>
        <Box
          direction={size !== 'small' ? 'row' : 'column'}
          justify='between'
          align='center'
          gap='medium'
        >
          <StyledHeading
            level={2}
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            size={size !== 'small' ? '2rem' : '1.5rem'}
            margin='none'
          >
            <Avatar width='50px' height='50x' />
            {t('ProjectStats.heading', { projectName: projectDisplayName })}
          </StyledHeading>
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
                <span>{data?.['total_count'].toLocaleString(locale)}</span>
              )}
            </SpacedText>
          </Box>
        </Box>
        <Box
          direction={size !== 'small' ? 'row' : 'column'}
          justify='between'
          pad={{ vertical: 'medium' }}
          gap='medium'
        >
          <Box role='tablist' direction='row' gap='medium'>
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
            <StyledBox
              basis='1/2' // required so it doesn't overlap the StyledTabs
              fill={size === 'small' ? 'horizontal' : false}
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
            </StyledBox>
          </ThemeContext.Extend>
        </Box>
        <Relative height='medium' margin={{ vertical: 'medium' }}>
          {loadingOrValidating ? <LoadingPlaceholder /> : null}
          {!loadingOrValidating && errorMessage?.length ? (
            <ErrorPlaceholder message={errorMessage} />
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
