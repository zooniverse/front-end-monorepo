import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

let initialDateRange = 'Last7Days'
if (isBrowser) {
  initialDateRange = localStorage?.getItem('selectedDateRange') || initialDateRange
}

export default function useStatsDateRange({ isLoading, user }) {
  const [selectedDateRange, setSelectedDateRange] = useState(initialDateRange)

  useEffect(function onDateRangeChange() {
    localStorage?.setItem('selectedDateRange', selectedDateRange)
  }, [selectedDateRange])

  useEffect(function onUserChange() {
    // when a user successfully logs out isLoading is false and user is undefined
    if (!isLoading && !user?.login) {
      setSelectedDateRange('Last7Days')
    }
  }, [isLoading, user?.login])

  return { selectedDateRange, setSelectedDateRange }
}
