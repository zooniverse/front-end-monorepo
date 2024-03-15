import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuth } from '@hooks'

const endpoint = '/memberships'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchMemberships({ query, authorization }) {
  try {
    const { body } = await panoptes.get(endpoint, query, { authorization })
    return body
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesMemberships({ authClient, query, userId }) {
  const authorization = usePanoptesAuth({ authClient, userId })

  const key = query.user_id ? { endpoint, query, authorization } : null
  return useSWR(key, fetchMemberships, SWRoptions)
}
