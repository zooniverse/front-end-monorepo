'use client'

import { UserStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import AuthenticatedUsersPageContainer from '../../../../components/AuthenticatedUsersPageContainer'
import { PanoptesAuthContext, UserStatsContext } from '../../../../contexts'

function UserStatsContainer({
  login,
  projectId
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  const {
    selectedDateRange,
    setSelectedDateRange
  } = useContext(UserStatsContext)
  const router = useRouter()
  const selectedProject = projectId || 'AllProjects'

  function updateQueryParam({ key, value }) {
    const queryParams = new URLSearchParams(window.location.search)
  
    if (key === 'project_id' && value === 'AllProjects') {
      queryParams.delete(key);
    } else {
      queryParams.set(key, value);
    }
  
    router.push(`${window.location.pathname}?${queryParams.toString()}`)
  }

  function setSelectedProject(selectedProjectId) {
    updateQueryParam({ key: 'project_id', value: selectedProjectId })
  }

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <UserStats
        authUser={user}
        login={login}
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        setSelectedDateRange={setSelectedDateRange}
        setSelectedProject={setSelectedProject}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default UserStatsContainer
