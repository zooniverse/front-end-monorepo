import { collections } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchProjectCollections({ query, token }) {
  const authorization = token ? `Bearer ${token}` : undefined
  
  const response = await collections.get({ authorization, query })
  return response?.body?.collections ?? []
}

export default function useProjectCollections({ favorite, login, projectId }) {
  const token = usePanoptesAuthToken()

  const query = {
    favorite,
    min_subjects: 2,
    project_ids: [projectId],
    sort: 'display_name'
  }
  if (login) query.owner = login
  
  let key = null
  if (projectId && (!login || token)) {
    key = { query, token }
  }

  return useSWR(key, fetchProjectCollections, SWRoptions)
}
