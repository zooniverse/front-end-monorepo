import { formatSelectOptionDateLabel } from './formatSelectOptionDateLabel'

const DEFAULT_DATE_RANGE = {
  endDate: new Date().toISOString().substring(0, 10),
  startDate: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().substring(0, 10)
}

function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

function getPresetSelectOptions(created_at = '2015-07-01') {
  const endDate = new Date()

  return [
    {
      label: 'LAST 7 DAYS',
      value: new Date(new Date().setDate(endDate.getDate() - 6)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 30 DAYS',
      value: new Date(new Date().setDate(endDate.getDate() - 29)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS MONTH',
      value: new Date(endDate.getFullYear(), endDate.getMonth(), 1).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 3 MONTHS',
      value: new Date(new Date().setDate(endDate.getDate() - 90)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS YEAR',
      value: new Date(endDate.getFullYear(), 0, 1).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 12 MONTHS',
      value: new Date((endDate.getFullYear() - 1), getNextMonth(endDate.getMonth()), 1).toISOString().substring(0, 10)
    },
    {
      label: 'ALL TIME',
      value: created_at
    }
  ]
}

export function getDateRangeSelectOptions({ created_at = '2015-07-01', selectedDateRange = DEFAULT_DATE_RANGE }) {
  const dateRangeOptions = getPresetSelectOptions(created_at)
  const todayUTC = new Date().toISOString().substring(0, 10)
  let selectedDateRangeOption = dateRangeOptions.find(option =>
    (selectedDateRange.endDate === todayUTC) &&
    (option.value === selectedDateRange.startDate)
  )
  if (!selectedDateRangeOption) {
    const customDateRangeOption = {
      label: `CUSTOM: ${formatSelectOptionDateLabel(selectedDateRange)}`,
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
