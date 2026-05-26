import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import ProjectStatistics from './ProjectStatistics'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function statsHost(env) {
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

async function fetchStats({ endpoint, projectId, displayedLaunchDate }) {
  const host = statsHost(env)

  try {
    const today = new Date()
    const todayUTC = today.toISOString().substring(0, 10)
    const response = await fetch(
      `${host}${endpoint}?project_id=${projectId}&end_date=${todayUTC}&start_date=${displayedLaunchDate}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

function useClassificationsCount(projectId, displayedLaunchDate) {
  const key = projectId ? { endpoint: '/classifications', projectId, displayedLaunchDate } : null
  return useSWR(key, fetchStats, SWROptions)
}

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    classifications: store?.project?.classifications_count,
    completedSubjects: store?.project?.retired_subjects_count,
    completeness: store?.project?.completeness,
    createdAtDate: store?.project?.created_at,
    launchDate: store?.project?.launch_date,
    projectId: store?.project?.id,
    projectName: store?.project?.display_name,
    subjects: store?.project?.subjects_count,
    volunteers: store?.project?.classifiers_count
  }
}

const ProjectStatisticsContainer = ({ className, hideLink = false }) => {
  const {
    classifications,
    completedSubjects,
    completeness,
    createdAtDate,
    launchDate,
    projectId,
    projectName,
    subjects,
    volunteers
  } = useStore()

  // Match the "All Time" data range option in ProjectStatsPage > ChartContainer
  const displayedLaunchDate = launchDate ? launchDate.substring(0, 10) : createdAtDate.substring(0, 10)

  const {
    data: erasData,
    isLoading,
    isValidating,
    error: erasError
  } = useClassificationsCount(projectId, displayedLaunchDate)
  const erasIsLoadingOrValidating = isLoading || isValidating // the Stat will just read as 0 for now

  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const linkProps = {
    externalLink: true, // A project stats page uses PFE
    href: `/projects/${owner}/${project}/stats`
  }

  return (
    <ProjectStatistics
      className={className}
      classifications={classifications}
      completedSubjects={completedSubjects}
      completeness={completeness}
      erasTotal={erasData?.total_count}
      hideLink={hideLink}
      launchDate={launchDate}
      linkProps={linkProps}
      projectName={projectName}
      subjects={subjects}
      volunteers={volunteers}
    />
  )
}

export default observer(ProjectStatisticsContainer)
