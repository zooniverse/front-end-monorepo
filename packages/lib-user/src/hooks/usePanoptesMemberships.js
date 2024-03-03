import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuth } from './usePanoptesAuth'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchMemberships({ endpoint, query, authorization }) {
  const userId = query?.user_id
  
  // userId and auth are undefined while loading
  if (userId === undefined || authorization === undefined) {
    return undefined
  }
  // logged in
  if (userId && authorization) {
    const { body } = await panoptes.get(endpoint, query, { authorization })
    return body || {}
  }
  // logged out
  return null
}

export function usePanoptesMemberships({ authClient, query }) {
  const authorization = usePanoptesAuth({ authClient })
  const endpoint = '/memberships'
  const key = { endpoint, query, authorization }
  return useSWR(key, fetchMemberships, SWRoptions)
}
