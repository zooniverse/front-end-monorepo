import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

let initialDateRange = 'Last7Days'
if (isBrowser) {
  initialDateRange = localStorage?.getItem('selectedDateRange') || initialDateRange
}

export default function useStatsDateRange() {
  const [selectedDateRange, setSelectedDateRange] = useState(initialDateRange)

  useEffect(function onDateRangeChange() {
    localStorage?.setItem('selectedDateRange', selectedDateRange)
  }, [selectedDateRange])

  return { selectedDateRange, setSelectedDateRange }
}
