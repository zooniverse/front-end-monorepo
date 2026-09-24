import useSWR from 'swr'
import { collections } from '@zooniverse/panoptes-js'

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
  return response?.body?.collections ?? []
}

export default function useProjectCollections({ favorite, login, projectId }) {
  const authorization = usePanoptesAuth()
  const query = {
    favorite,
    min_subjects: 2,
    owner: login,
    project_ids: [projectId],
    sort: 'display_name'
  }
  const key = authorization && projectId && login ? { authorization, query } : null

  return useSWR(key, fetchProjectCollections, SWRoptions)
}
