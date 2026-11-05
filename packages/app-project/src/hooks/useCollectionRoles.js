import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchCollectionRoles({ collectionId, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  const response = await panoptes.get(
    '/collection_roles',
    { collection_id: collectionId },
    { authorization }
  )
  return response?.body?.collection_roles ?? []
}

export default function useCollectionRoles({ collectionId }) {
  const token = usePanoptesAuthToken()
  
  const key = token && collectionId ? { collectionId, token } : null
  return useSWR(key, fetchCollectionRoles, SWROptions)
}
