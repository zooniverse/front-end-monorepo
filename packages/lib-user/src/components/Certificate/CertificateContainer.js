'use client'

import { shape, string } from 'prop-types'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  convertStatsSecondsToHours,
  getDateInterval
} from '@utils'

import Certificate from './Certificate'

const DEFAULT_DATE_RANGE = {
  endDate: null,
  startDate: null
}
const STATS_ENDPOINT = '/classifications/users'

function CertificateContainer({
  authUser,
  login,
  selectedDateRange = DEFAULT_DATE_RANGE,
  selectedProject = 'AllProjects'
}) {
  // fetch user
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authUser,
    login,
    requiredUserProperty: 'credited_name'
  })

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
    sourceId: user?.id,
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
  const name = user?.credited_name || user?.display_name || login
  const projectsCount = stats?.project_contributions?.length || 0
  const projectDisplayName = projects?.[0]?.display_name
  const showPrePanoptesInfo = selectedDateRange.startDate <= '2015-03-17'

  return (
    <Certificate
      hours={hours}
      login={user?.login}
      name={name}
      projectDisplayName={projectDisplayName}
      projectsCount={projectsCount}
      selectedDateRange={selectedDateRange}
      showPrePanoptesInfo={showPrePanoptesInfo}
    />
  )
}

CertificateContainer.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }),
  login: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
}

export default CertificateContainer
