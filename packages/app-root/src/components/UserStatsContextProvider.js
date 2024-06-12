'use client'

import { useState } from 'react'

import { UserStatsContext } from '../contexts'

function UserStatsContextProvider({ children }) {
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')
  const [selectedProject, setSelectedProject] = useState('AllProjects')

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
