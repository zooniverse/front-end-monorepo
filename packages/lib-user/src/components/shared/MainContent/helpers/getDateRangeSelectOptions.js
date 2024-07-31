import { formatSelectOptionDateLabel } from './formatSelectOptionDateLabel'

function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

function getPresetSelectOptions({ created_at = '2015-07-01', today }) {
  return [
    {
      label: 'LAST 7 DAYS',
      value: new Date(new Date().setUTCDate(today.getUTCDate() - 6)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 30 DAYS',
      value: new Date(new Date().setUTCDate(today.getUTCDate() - 29)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS MONTH',
      value: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 3 MONTHS',
      value: new Date(new Date().setUTCDate(today.getUTCDate() - 90)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS YEAR',
      value: new Date(Date.UTC(today.getUTCFullYear(), 0, 1)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 12 MONTHS',
      value: new Date(Date.UTC((today.getUTCFullYear() - 1), getNextMonth(today.getUTCMonth()), 1)).toISOString().substring(0, 10)
    },
    {
      label: 'ALL TIME',
      value: created_at
    }
  ]
}

const DEFAULT_DATE_RANGE = {
  endDate: new Date().toISOString().substring(0, 10),
  startDate: new Date(new Date().setUTCDate(new Date().getUTCDate() - 6)).toISOString().substring(0, 10)
}

export function getDateRangeSelectOptions({ created_at = '2015-07-01', selectedDateRange = DEFAULT_DATE_RANGE }) {
  const today = new Date()
  const todayUTC = today.toISOString().substring(0, 10)
  
  const dateRangeOptions = getPresetSelectOptions({ created_at, today })
  
  let selectedDateRangeOption = dateRangeOptions.find(option =>
    (selectedDateRange.endDate === todayUTC) &&
    (option.value === selectedDateRange.startDate)
  )
  
  if (!selectedDateRangeOption) {
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
