import { shape, string } from 'prop-types'
import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesProjects } from '@hooks'
import RecentSubjects from './RecentSubjects.js'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchUserRecents({ userId }) {
  try {
    const query = {
      page_size: 10,
      sort: '-created_at'
    }
    const response = await panoptes.get(`/users/${userId}/recents`, query)
    return response.body?.recents
  } catch (error) {
    console.error(error)
    throw error
  }
}

function RecentSubjectsContainer({ authUser }) {
  const cacheKey = {
    name: 'user-recent-classifications',
    userId: authUser.id
  }
  const { data: recents, isLoading: recentsLoading, error: recentsError } = useSWR(cacheKey, fetchUserRecents, SWROptions)

  const recentProjectIds = [...new Set(recents?.map(recent => recent.links?.project))]

  const { data: projects, isLoading: projectsLoading, error: projectsError } = usePanoptesProjects(recentProjectIds)

  // Attach project slug to each recent
  let recentsWithProjectSlugs
  if (projects?.length) {
    recentsWithProjectSlugs = recents.map(recent => {
      const { slug } = projects.find(project => recent.links.project === project.id)
      recent.project_slug = slug
      return recent
    })
  }

  const error = recentsError || projectsError
  const isLoading = recentsLoading || projectsLoading

  return (
    <RecentSubjects
      isLoading={isLoading}
      recents={recentsWithProjectSlugs}
      error={error}
    />
  )
}

export default RecentSubjectsContainer

RecentSubjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}
