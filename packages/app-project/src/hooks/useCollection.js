import { collections } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchCollection({ slug, token }) {
  const authorization = token ? `Bearer ${token}` : undefined
  
  const response = await collections.get({ authorization, query: { slug } })
  return response?.body?.collections?.[0]
}

export default function useCollection({ slug }) {
  const token = usePanoptesAuthToken()
  
  const key = slug ? { slug, token } : null
  
  return useSWR(key, fetchCollection, SWROptions)
}
