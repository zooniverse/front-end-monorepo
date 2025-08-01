import { shape, string } from 'prop-types'
import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesProjects } from '@hooks'
import RecentSubjects from './RecentSubjects'

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

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: recentProjectIds?.join(',')
  })

  // Attach project slug to each recent
  let recentsWithProjectSlugs
  if (projects?.length) {
    recentsWithProjectSlugs = recents
      .map(recent => {
        const matchedProjectObj = projects.find(
          project => project.id === recent.links?.project
        )

        if (matchedProjectObj) {
          recent.projectSlug = matchedProjectObj.slug
        }
        return recent
      })
      .filter(recent => recent?.projectSlug)
      .slice(0, 10)
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

RecentSubjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentSubjectsContainer
