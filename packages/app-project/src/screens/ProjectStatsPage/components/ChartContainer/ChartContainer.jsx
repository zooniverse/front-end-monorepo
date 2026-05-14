import { useQueryState } from 'nuqs'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { Box } from 'grommet'

import ContentBox from '@shared/components/ContentBox'
import BarChart from '../BarChart/BarChart'
import { getDateInterval } from '../../helpers/getDateInterval'
import validateDateRangeParams from '../../helpers/validateDateRangeParams'
import useProjectStats from '../../helpers/useProjectStats'

function getStatsDateString(date) {
  if (date instanceof Date) {
    return date.toISOString().substring(0, 10) // .toISOString returns UTC
  } else {
    return date?.substring(0, 10)
  }
}

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    launchDate: project?.launch_date,
    projectDisplayName: project?.display_name,
    projectId: project?.id
  }
}

function ChartContainer() {
  const { t } = useTranslation('screens')
  const { launchDate, projectDisplayName, projectId } = useStores()

  const today = new Date()
  const dateRangeOptions = [
    {
      label: t('ProjectStats.BarChart.dateRange.lastSevenDays').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 6))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.lastThirtyDays').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 29))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.thisMonth').toUpperCase(),
      value: getStatsDateString(
        new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.lastThreeMonths').toUpperCase(),
      value: getStatsDateString(
        new Date(new Date().setUTCDate(today.getUTCDate() - 90))
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.thisYear').toUpperCase(),
      value: getStatsDateString(
        new Date(Date.UTC(today.getUTCFullYear(), 0, 1))
      )
    },
    {
      label: t(
        'ProjectStats.BarChart.dateRange.lastTwelveMonths'
      ).toUpperCase(),
      value: getStatsDateString(
        new Date(
          Date.UTC(
            today.getUTCFullYear() - 1,
            today.getUTCMonth() === 11 ? 0 : today.getUTCMonth() + 1,
            1
          )
        )
      )
    },
    {
      label: t('ProjectStats.BarChart.dateRange.allTime').toUpperCase(),
      value: launchDate
    }
  ]

  // Handle label for a custom selected date range
  // if (!selectedDateRangeOption && !paramsValidationMessage) {
  //   const customDateRangeOption = {
  //     label: `${formatSelectOptionDateLabel(selectedDateRange)}`, // use Intl API for this
  //     value: 'custom'
  //   }
  //   dateRangeOptions.push(customDateRangeOption)
  //   selectedDateRangeOption = customDateRangeOption
  // } else {
  //   dateRangeOptions.push({
  //     label: t('MainContent.dateRange.custom').toUpperCase(),
  //     value: 'custom'
  //   })
  // }

  const defaultStartDate = dateRangeOptions[0].value

  const [startDate, setStartDate] = useQueryState('startDate', {
    defaultValue: defaultStartDate
  })
  const [endDate, setEndDate] = useQueryState('endDate') // if not provided to ERAS, defaults to today?
  const [type, setType] = useQueryState('type', { defaultValue: 'count' })
  const [workflow, setWorkflow] = useQueryState('workflow')

  const { dateRangeMessage } = validateDateRangeParams({ endDate, startDate })

  const dateInterval = getDateInterval({ endDate, startDate })

  // For the dropdown
  const todayUTC = getStatsDateString(today)
  let selectedDateRangeOption = dateRangeOptions.find(
    option => endDate === todayUTC && option.value === startDate
  )

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

  const { data, error, isLoading, isValidating } = useProjectStats(filteredQuery)

  // Sample data { total_count: 87654, data: [{ period, count }]}

  return (
    <ContentBox>
      {projectDisplayName}
      <Box height='medium'>
        <BarChart
          data={data?.data}
          dateRange={{ startDate, endDate }}
          type={type}
        />
      </Box>
    </ContentBox>
  )
}

export default observer(ChartContainer)
