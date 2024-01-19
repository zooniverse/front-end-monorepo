const dateRanges = {}

Object.defineProperty(dateRanges, 'Last7Days', {
  value: 'Last7Days',
  enumerable: true
})

Object.defineProperty(dateRanges, 'Last30Days', {
  value: 'Last30Days',
  enumerable: true
})

Object.defineProperty(dateRanges, 'ThisMonth', {
  value: 'ThisMonth',
  enumerable: true
})

Object.defineProperty(dateRanges, 'Last3Months', {
  value: 'Last3Months',
  enumerable: true
})

Object.defineProperty(dateRanges, 'ThisYear', {
  value: 'ThisYear',
  enumerable: true
})

Object.defineProperty(dateRanges, 'Last12Months', {
  value: 'Last12Months',
  enumerable: true
})

Object.defineProperty(dateRanges, 'AllTime', {
  value: 'AllTime',
  enumerable: true
})

// helper for returning date ranges
Object.defineProperty(dateRanges, 'values', {
  value: Object.values(dateRanges)
})

export default dateRanges
