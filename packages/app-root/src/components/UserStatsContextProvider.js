'use client'

import { useContext } from 'react'

import { PanoptesAuthContext, UserStatsContext } from '../contexts'
import { useStatsDateRange, useStatsProject } from '../hooks'

function UserStatsContextProvider({ children }) {
  const { isLoading, user } = useContext(PanoptesAuthContext)
  const { selectedDateRange, setSelectedDateRange } = useStatsDateRange({ isLoading, user })
  const { selectedProject, setSelectedProject } = useStatsProject({ isLoading, user })

  const statsContext = {
    selectedDateRange,
    selectedProject,
    setSelectedDateRange,
    setSelectedProject
  }

  return (
    <UserStatsContext.Provider value={statsContext}>
      {children}
    </UserStatsContext.Provider>
  )
}

export default UserStatsContextProvider
