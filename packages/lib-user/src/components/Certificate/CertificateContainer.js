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
  paramsValidationMessage = '',
  selectedDateRange = DEFAULT_DATE_RANGE,
  selectedProject = undefined
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
    sourceId: paramsValidationMessage ? null : user?.id,
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
  const name = user?.credited_name || user?.display_name || login
  const projectsCount = stats?.project_contributions?.length || 0
  const projectDisplayName = projects?.[0]?.display_name

  return (
    <Certificate
      hours={hours}
      login={user?.login}
      name={name}
      paramsValidationMessage={paramsValidationMessage}
      projectDisplayName={projectDisplayName}
      projectsCount={projectsCount}
      selectedDateRange={selectedDateRange}
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
