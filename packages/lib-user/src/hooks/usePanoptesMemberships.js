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
  const userID = query?.user_id
  
  // userID and auth are undefined while loading
  if (userID === undefined || authorization === undefined) {
    return undefined
  }
  // logged in
  if (userID && authorization) {
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
