import asyncStates from '@zooniverse/async-states'
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

export function usePanoptesMemberships({ authClient, authUserId, joinStatus = null, query }) {
  const authorization = usePanoptesAuth({ authClient, authUserId })
  const joinStatusSuccess = joinStatus === asyncStates.success

  const key = authorization && query.user_id ? { endpoint, query, joinStatusSuccess, authorization } : null
  return useSWR(key, fetchMemberships, SWRoptions)
}
