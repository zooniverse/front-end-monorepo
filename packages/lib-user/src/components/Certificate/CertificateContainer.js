'use client'

import { shape, string } from 'prop-types'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  convertStatsSecondsToHours
} from '@utils'

import Certificate from './Certificate'

const STATS_ENDPOINT = '/classifications/users'

function CertificateContainer({
  authUser,
  login,
  paramsValidationMessage = '',
  selectedDateRange,
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
  // only fetch stats (define sourceId with user.id) if valid params and start date defined
  let userId = null
  if (!paramsValidationMessage && selectedDateRange?.startDate) {
    userId = user?.id
  }
  const statsQuery = {
    end_date: selectedDateRange?.endDate,
    period: 'year',
    start_date: selectedDateRange?.startDate,
    time_spent: true
  }
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
    sourceId: userId,
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

  const error = userError || statsError || projectsError
  const hours = convertStatsSecondsToHours(stats?.time_spent) || 0
  const loading = userLoading || statsLoading || projectsLoading
  const name = user?.credited_name || user?.display_name || login
  const projectsCount = stats?.project_contributions?.length || 0
  const projectDisplayName = projects?.[0]?.display_name

  return (
    <Certificate
      error={error}
      hours={hours}
      loading={loading}
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
  }).isRequired,
  login: string.isRequired,
  paramsValidationMessage: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }).isRequired,
  selectedProject: string,
}

export default CertificateContainer
