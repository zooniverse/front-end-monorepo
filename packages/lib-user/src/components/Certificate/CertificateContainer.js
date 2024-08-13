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

const DEFAULT_DATE_RANGE = {
  endDate: null,
  startDate: null
}
const STATS_ENDPOINT = '/classifications/users'

function CertificateContainer({
  authUser,
  login,
  paramsValidationMessage = '',
  selectedDateRange = DEFAULT_DATE_RANGE,
  selectedProject = undefined
}) {
  // TODO: fetch user data if authUser is not login user (admin view)

  // fetch stats
  const statsQuery = getDateInterval(selectedDateRange)
  statsQuery.time_spent = true
  if (selectedProject === undefined) {
    statsQuery.project_contributions = true
  } else {
    statsQuery.project_id = parseInt(selectedProject)
  }
  
  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: paramsValidationMessage ? null : authUser?.id,
    query: statsQuery
  })

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects({
    cards: true,
    id: selectedProject
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
      paramsValidationMessage={paramsValidationMessage}
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
  paramsValidationMessage: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
}

export default CertificateContainer
