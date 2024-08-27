import {
  getStatsDateString
} from '@utils'

import { formatSelectOptionDateLabel } from './formatSelectOptionDateLabel'

function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

function getPresetSelectOptions({ sourceCreatedAtDate, today }) {
  return [
    {
      label: 'LAST 7 DAYS',
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 6)))
    },
    {
      label: 'LAST 30 DAYS',
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 29)))
    },
    {
      label: 'THIS MONTH',
      value: getStatsDateString(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)))
    },
    {
      label: 'LAST 3 MONTHS',
      value: getStatsDateString(new Date(new Date().setUTCDate(today.getUTCDate() - 90)))
    },
    {
      label: 'THIS YEAR',
      value: getStatsDateString(new Date(Date.UTC(today.getUTCFullYear(), 0, 1)))
    },
    {
      label: 'LAST 12 MONTHS',
      value: getStatsDateString(new Date(Date.UTC((today.getUTCFullYear() - 1), getNextMonth(today.getUTCMonth()), 1)))
    },
    {
      label: 'ALL TIME',
      value: sourceCreatedAtDate
    }
  ]
}

const DEFAULT_DATE_RANGE = {
  endDate: getStatsDateString(new Date()),
  startDate: getStatsDateString(new Date(new Date().setUTCDate(new Date().getUTCDate() - 6)))
}

export function getDateRangeSelectOptions({
  sourceCreatedAtDate = '',
  paramsValidationMessage = '',
  selectedDateRange = DEFAULT_DATE_RANGE
}) {
  const today = new Date()
  const todayUTC = getStatsDateString(today)
  
  const dateRangeOptions = getPresetSelectOptions({ sourceCreatedAtDate, today })
  
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
      label: 'CUSTOM',
      value: 'custom'
    })
  }
  
  return { dateRangeOptions, selectedDateRangeOption }
}
