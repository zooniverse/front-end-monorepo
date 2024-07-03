'use client'

import { useContext } from 'react'

import { PanoptesAuthContext, UserStatsContext } from '../contexts'
import { useStatsDateRange } from '../hooks'

function UserStatsContextProvider({ children }) {
  const { isLoading, user } = useContext(PanoptesAuthContext)
  const { selectedDateRange, setSelectedDateRange } = useStatsDateRange({ isLoading, user })

  const statsContext = {
    selectedDateRange,
    setSelectedDateRange
  }

  return (
    <UserStatsContext.Provider value={statsContext}>
      {children}
    </UserStatsContext.Provider>
  )
}

export default UserStatsContextProvider
