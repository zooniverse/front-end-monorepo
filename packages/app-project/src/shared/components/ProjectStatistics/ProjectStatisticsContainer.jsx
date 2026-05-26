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

async function fetchStats({ endpoint, projectId }) {
  const host = statsHost(env)

  try {
    const response = await fetch(`${host}${endpoint}?project_id=${projectId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

function useClassificationsCount(projectId) {
  const key = { endpoint: '/classifications', projectId }
  return useSWR(key, fetchStats, SWROptions)
}

function useStore() {
  const { store } = useContext(MobXProviderContext)
  const { data: erasData } = useClassificationsCount(store?.project?.id)

  return {
    classifications: erasData?.total_count,
    completedSubjects: store?.project?.retired_subjects_count,
    completeness: store?.project?.completeness,
    launchDate: store?.project?.launch_date,
    projectName: store?.project?.display_name,
    subjects: store?.project?.subjects_count,
    volunteers: store?.project?.classifiers_count
  }
}

const ProjectStatisticsContainer = ({ className, hideLink = false, titleLevel = 2 }) => {
  const {
    classifications,
    completedSubjects,
    completeness,
    launchDate,
    projectName,
    subjects,
    volunteers
  } = useStore()

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
      hideLink={hideLink}
      launchDate={launchDate}
      linkProps={linkProps}
      projectName={projectName}
      subjects={subjects}
      titleLevel={titleLevel}
      volunteers={volunteers}
    />
  )
}

export default observer(ProjectStatisticsContainer)
