'use client'

import { GroupStats } from '@zooniverse/user'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../contexts'

function GroupStatsContainer({
  groupId,
  joinToken,
  projectId
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

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

  if (typeof window === 'undefined' || isLoading) {
    return (
      <p>Loading...</p>
    )
  }
  
  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
      joinToken={joinToken}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
    />
  )
}

export default GroupStatsContainer
