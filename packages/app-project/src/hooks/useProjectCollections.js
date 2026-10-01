import useSWR from 'swr'
import { collections } from '@zooniverse/panoptes-js'

import {
  COLLECTIONS_PAGE_SIZE,
  DEFAULT_COLLECTION_MIN_SUBJECTS,
  DEFAULT_COLLECTION_SORT
} from '@helpers/collectionQueryParams'
import { usePanoptesAuth } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchProjectCollections({ authorization, query }) {
  const response = await collections.get({ authorization, query })
  const projectCollections = response?.body?.collections ?? []
  const pageCount = response?.body?.meta?.collections?.page_count ?? 1
  const count = response?.body?.meta?.collections?.count ?? 0

  return { collections: projectCollections, pageCount, count }
}

export default function useProjectCollections({
  favorite,
  fallbackData,
  login,
  minSubjects = DEFAULT_COLLECTION_MIN_SUBJECTS,
  page = 1,
  projectId,
  sort = DEFAULT_COLLECTION_SORT
}) {
  const authorization = usePanoptesAuth()
  const query = {
    favorite,
    min_subjects: minSubjects,
    owner: login,
    page,
    page_size: COLLECTIONS_PAGE_SIZE,
    project_ids: [projectId],
    sort
  }
  const hasAuthorization = Boolean(authorization)
  const key = projectId && (!login || hasAuthorization) ? { authorization, query } : null
  const options = fallbackData ? { ...SWRoptions, fallbackData } : SWRoptions

  return useSWR(key, fetchProjectCollections, options)
}
