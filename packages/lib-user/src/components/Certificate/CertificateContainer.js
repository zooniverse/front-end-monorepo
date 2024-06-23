'use client'

import { shape, string } from 'prop-types'

import {
  usePanoptesProjects,
  useStats
} from '@hooks'

import {
  convertStatsSecondsToHours,
  getDateInterval
} from '@utils'

import Certificate from './Certificate'

const STATS_ENDPOINT = '/classifications/users'

function CertificateContainer({
  authUser,
  login,
  selectedDateRange = 'AllTime',
  selectedProject = 'AllProjects'
}) {
  // TODO: fetch user data if authUser is not login user (admin view)

  // fetch stats
  const statsQuery = getDateInterval(selectedDateRange)
  statsQuery.time_spent = true
  if (selectedProject !== 'AllProjects') {
    statsQuery.project_id = parseInt(selectedProject)
  } else {
    statsQuery.project_contributions = true
  }
  
  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: authUser?.id,
    query: statsQuery
  })

  // fetch projects, if selectedProject is not 'AllProjects'
  const projectId = selectedProject !== 'AllProjects' ? selectedProject : null
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects({
    cards: true,
    id: projectId
  })
  
  const hours = convertStatsSecondsToHours(stats?.time_spent)
  const projectsCount = stats?.project_contributions?.length || 0
  const projectDisplayName = projects?.[0]?.display_name

  return (
    <Certificate
      creditedName={authUser?.credited_name}
      displayName={authUser?.display_name}
      hours={hours}
      login={authUser?.login}
      projectsCount={projectsCount}
      selectedDateRange={selectedDateRange}
      projectDisplayName={projectDisplayName}
    />
  )
}

CertificateContainer.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }),
  login: string,
  selectedDateRange: string,
  selectedProject: string,
}

export default CertificateContainer
