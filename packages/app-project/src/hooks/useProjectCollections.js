import { collections } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import {
  COLLECTIONS_PAGE_SIZE,
  DEFAULT_COLLECTION_MIN_SUBJECTS,
  DEFAULT_COLLECTION_SORT
} from '@helpers/collectionQueryParams'
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
  const projectCollections = response?.body?.collections ?? []
  const pageCount = response?.body?.meta?.collections?.page_count ?? 1
  const count = response?.body?.meta?.collections?.count ?? 0

  return { collections: projectCollections, pageCount, count }
}

export default function useProjectCollections({
  favorite,
  login,
  minSubjects = DEFAULT_COLLECTION_MIN_SUBJECTS,
  page = 1,
  projectId,
  sort = DEFAULT_COLLECTION_SORT
}) {
  const token = usePanoptesAuthToken()

  const query = {
    favorite,
    min_subjects: 2,
    project_ids: [projectId],
    sort
  }
  if (login) query.owner = login
  
  let key = null
  if (projectId && (!login || token)) {
    key = { query, token }
  }

  return useSWR(key, fetchProjectCollections, options)
}
