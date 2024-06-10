import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const isBrowser = typeof window !== 'undefined'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

if (isBrowser) {
  auth.checkCurrent()
}

async function fetchMemberships({ query }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null 

  try {
    const { body } = await panoptes.get('/memberships', query, { authorization })
    return body
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesMemberships({ authUserId, joinStatus = null, query }) {
  // joinStatusSuccess is a boolean trigger for re-requesting membership after a user successfully joins a group
  // a user with a join_token will request a membership on initial page load that will return null
  // once the user with a join_token's membership is created, the joinStatus will be set to asyncStates.success, 
  // then joinStatusSuccess will be true, and the membership will be re-requested 
  const joinStatusSuccess = joinStatus === asyncStates.success

  const key = (query.user_id || query.user_group_id) && authUserId ? { query, joinStatusSuccess } : null
  return useSWR(key, fetchMemberships, SWROptions)
}
