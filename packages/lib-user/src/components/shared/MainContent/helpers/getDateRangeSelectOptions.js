function getNextMonth(month) {
  return month === 11 ? 0 : month + 1
}

export function getDateRangeSelectOptions(created_at = '2015-07-01') {
  const endDate = new Date()

  return [
    {
      label: 'LAST 7 DAYS',
      value: new Date(new Date().setUTCDate(endDate.getUTCDate() - 6)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 30 DAYS',
      value: new Date(new Date().setUTCDate(endDate.getUTCDate() - 29)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS MONTH',
      value: new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), 1)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 3 MONTHS',
      value: new Date(new Date().setUTCDate(endDate.getUTCDate() - 90)).toISOString().substring(0, 10)
    },
    {
      label: 'THIS YEAR',
      value: new Date(Date.UTC(endDate.getUTCFullYear(), 0, 1)).toISOString().substring(0, 10)
    },
    {
      label: 'LAST 12 MONTHS',
      value: new Date(Date.UTC((endDate.getUTCFullYear() - 1), getNextMonth(endDate.getUTCMonth()), 1)).toISOString().substring(0, 10)
    },
    {
      label: 'ALL TIME',
      value: created_at.substring(0, 10)
    }
  ]
}
