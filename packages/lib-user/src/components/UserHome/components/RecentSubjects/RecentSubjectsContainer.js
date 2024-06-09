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

async function fetchUserRecents({userId}) {
  try {
    const query = {
      page: 1,
      sort: '-created_at'
    }
    const response = await panoptes.get(`/users/${userId}/recents`, query)
    return response.body?.recents
  } catch (error) {
    console.error(error)
    return []
  }
}


function RecentSubjectsContainer({ authUser }) {
  const cacheKey = {
    name: 'user-recent-classifications',
    userId: authUser.id
  }
  const { data, isLoading: recentsLoading, error: recentsError } = useSWR(cacheKey, fetchUserRecents, SWROptions)

  // We only display 10 in the UI, so only fetch project data for the first 10 recents
  const recents = data?.slice(0, 10)
  const recentProjectIds = recents
    ?.slice(0, 10)
    .map(recent => parseInt(recent.links?.project)) // ?

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
  const isLoading = recentsLoading || projectsLoading ? true : false

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
