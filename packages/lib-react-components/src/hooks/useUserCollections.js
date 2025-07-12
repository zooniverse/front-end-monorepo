import { collections } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from './usePanoptesAuthToken'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchUserCollections({ query, token }) {
  const authorization = `Bearer ${token}`

  const response = await collections.get({ authorization, query })
  
  return response?.body?.collections
}

export default function useUserCollections({ user, query }) {
  const token = usePanoptesAuthToken()
  const key = token ? { query, token } : null

  return useSWR(key, fetchUserCollections, SWRoptions)
}
