'use client'

import { UserStatsContext } from '../contexts'
import { useStatsDateRange, useStatsProject } from '../hooks'

function UserStatsContextProvider({ children }) {
  const { selectedDateRange, setSelectedDateRange } = useStatsDateRange()
  const { selectedProject, setSelectedProject } = useStatsProject()

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
