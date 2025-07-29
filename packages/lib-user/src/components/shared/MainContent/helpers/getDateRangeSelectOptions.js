import {
  getStatsDateString
} from '@utils'

import { formatSelectOptionDateLabel } from './formatSelectOptionDateLabel'

function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

function getPresetSelectOptions({ sourceCreatedAtDate, today, t }) {
  return [
    {
      label: t('MainContent.dateRange.lastSevenDays').toUpperCase(),
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 6)))
    },
    {
      label: t('MainContent.dateRange.lastThirtyDays').toUpperCase(),
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 29)))
    },
    {
      label: t('MainContent.dateRange.thisMonth').toUpperCase(),
      value: getStatsDateString(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)))
    },
    {
      label: t('MainContent.dateRange.lastThreeMonths').toUpperCase(),
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 90)))
    },
    {
      label: t('MainContent.dateRange.thisYear').toUpperCase(),
      value: getStatsDateString(new Date(Date.UTC(today.getUTCFullYear(), 0, 1)))
    },
    {
      label: t('MainContent.dateRange.lastTwelveMonths').toUpperCase(),
      value: getStatsDateString(new Date(Date.UTC((today.getUTCFullYear() - 1), getNextMonth(today.getUTCMonth()), 1)))
    },
    {
      label: t('MainContent.dateRange.allTime').toUpperCase(),
      value: sourceCreatedAtDate
    }
  ]
}

const DEFAULT_DATE_RANGE = {
  endDate: undefined,
  startDate: undefined
}
const DEFAULT_HANDLER = key => key

export function getDateRangeSelectOptions({
  sourceCreatedAtDate = '',
  paramsValidationMessage = '',
  selectedDateRange = DEFAULT_DATE_RANGE,
  t = DEFAULT_HANDLER
}) {
  const today = new Date()
  const todayUTC = getStatsDateString(today)

  const dateRangeOptions = getPresetSelectOptions({ sourceCreatedAtDate, today, t })

  let selectedDateRangeOption = dateRangeOptions.find(option =>
    (selectedDateRange.endDate === todayUTC) &&
    (option.value === selectedDateRange.startDate)
  )

  if (!selectedDateRangeOption && !paramsValidationMessage) {
    const customDateRangeOption = {
      label: `${formatSelectOptionDateLabel(selectedDateRange)}`,
      value: 'custom'
    }
    dateRangeOptions.push(customDateRangeOption)
    selectedDateRangeOption = customDateRangeOption
  } else {
    dateRangeOptions.push({
      label: t('MainContent.dateRange.custom').toUpperCase(),
      value: 'custom'
    })
  }

  return { dateRangeOptions, selectedDateRangeOption }
}
