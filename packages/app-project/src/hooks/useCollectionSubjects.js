import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  keepPreviousData: true
}

async function fetchCollectionSubjects({ collectionId, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  const response = await panoptes.get(
    '/subjects',
    { collection_id: collectionId },
    { authorization }
  )
  return response?.body?.subjects ?? []
}

export default function useCollectionSubjects({ collectionId }) {
  const token = usePanoptesAuthToken()

  const key = collectionId ? { collectionId } : null
  return useSWR(key, ({ collectionId }) => fetchCollectionSubjects({ collectionId, token }), SWROptions)
}
