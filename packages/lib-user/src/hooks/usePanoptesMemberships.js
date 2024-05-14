import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const endpoint = '/memberships'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchMemberships({ query }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null 

  try {
    const { body } = await panoptes.get(endpoint, query, { authorization })
    return body
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesMemberships({ authUserId, joinStatus = null, query }) {
  const joinStatusSuccess = joinStatus === asyncStates.success

  const key = query.user_id && authUserId ? { endpoint, query, joinStatusSuccess } : null
  return useSWR(key, fetchMemberships, SWRoptions)
}
