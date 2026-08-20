import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  keepPreviousData: true
}

async function fetchRecents({ projectId, token, userId }) {
  const authorization = token ? `Bearer ${token}` : ''
  const query = {
    include: 'subject',
    project_id: projectId,
    sort: '-created_at'
  }

  return panoptes.get(`/users/${userId}/recents`, query, { authorization })
    .then(response => {
      const { recents = [] } = response?.body ?? {}
      const linkedSubjects = response?.body?.linked?.subjects || []
      const subjectsById = new Map(linkedSubjects.map(subject => [subject.id, subject]))
      return recents.map(recent => ({
        ...recent,
        subject: subjectsById.get(recent.links.subject)
      }))
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function useRecents({ projectId, userId }) {
  const token = usePanoptesAuthToken()

  // key omits token so a token refresh doesn't change the cache identity and reset data to empty
  let key = null
  if (userId && projectId) {
    key = { projectId, userId }
  }

  return useSWR(key, ({ projectId, userId }) => fetchRecents({ projectId, token, userId }), SWROptions)
}
