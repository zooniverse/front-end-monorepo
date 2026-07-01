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
      include: 'subject',
      page_size: 10,
      sort: '-created_at'
    }
    const response = await panoptes.get(`/users/${userId}/recents`, query)
    return {
      recents: response.body?.recents,
      subjects: response.body?.linked?.subjects
    }
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
  const { data: recentData, isLoading: recentsLoading, error: recentsError } = useSWR(cacheKey, fetchUserRecents, SWROptions)

  const recents = recentData?.recents
  const linkedSubjects = recentData?.subjects

  const recentProjectIds = [...new Set(recents?.map(recent => recent.links?.project))]

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: recentProjectIds?.join(',')
  })

  // Attach project slug and linked subject resource to each recent.
  const projectSlugsById = new Map(projects?.map(project => [project.id, project.slug]))
  const subjectsById = new Map(linkedSubjects?.map(subject => [subject.id, subject]))

  const recentsWithProjectSlugAndSubject = recents
    ?.map(recent => ({
      ...recent,
      projectSlug: projectSlugsById.get(recent.links?.project),
      subject: subjectsById.get(recent.links?.subject)
    }))
    .filter(recent => recent?.projectSlug && recent?.subject)

  const error = recentsError || projectsError
  const isLoading = recentsLoading || projectsLoading

  return (
    <RecentSubjects
      error={error}
      isLoading={isLoading}
      login={authUser?.login}
      recents={recentsWithProjectSlugAndSubject}
      userId={authUser?.id}
    />
  )
}

RecentSubjectsContainer.propTypes = {
  authUser: shape({
    id: string,
    login: string
  })
}

export default RecentSubjectsContainer
