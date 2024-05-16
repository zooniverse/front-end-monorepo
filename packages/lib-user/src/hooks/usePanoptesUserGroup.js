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

async function fetchPanoptesUserGroup({ groupId }) {
  let token = await auth.checkBearerToken()
  if (!token) {
    await auth.checkCurrent()
    token = await auth.checkBearerToken()
  }
  const authorization = `Bearer ${token}`

  const endpoint = `/user_groups/${groupId}`
  
  try {
    const { body } = await panoptes.get(endpoint, {}, { authorization })
    const { user_groups } = body
    const user_group = user_groups?.[0]
    return user_group
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesUserGroup({ adminMode, authUserId, groupId, joinStatus }) {
  const isJoinStatusValid = joinStatus === null || joinStatus === asyncStates.success
  const key = groupId && isJoinStatusValid ? { adminMode, authUserId, groupId, joinStatus } : null;
  return useSWR(key, fetchPanoptesUserGroup, SWROptions)
}
