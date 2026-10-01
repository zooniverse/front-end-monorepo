import useSWR from 'swr'
import { collections } from '@zooniverse/panoptes-js'

import { usePanoptesAuth } from '@hooks'

const PAGE_SIZE = 20

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

  return { collections: projectCollections, pageCount }
}

export default function useProjectCollections({
  favorite,
  fallbackData,
  login,
  page = 1,
  projectId
}) {
  const authorization = usePanoptesAuth()
  const query = {
    favorite,
    min_subjects: 2,
    owner: login,
    page,
    page_size: PAGE_SIZE,
    project_ids: [projectId],
    sort: 'display_name'
  }
  const hasAuthorization = Boolean(authorization)
  const key = projectId && (!login || hasAuthorization) ? { authorization, query } : null
  const options = fallbackData ? { ...SWRoptions, fallbackData } : SWRoptions

  return useSWR(key, fetchProjectCollections, options)
}
