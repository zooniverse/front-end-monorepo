import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPanoptesUserGroup({ groupId }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const endpoint = `/user_groups/${groupId}`
  
  try {
    const response = await panoptes.get(endpoint, {}, { authorization })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesUserGroup({ adminMode, authUserId, groupId, joinStatus }) {
  const isJoinStatusValid = joinStatus === null || joinStatus === asyncStates.success
  const key = groupId && isJoinStatusValid ? { adminMode, authUserId, groupId, joinStatus } : null;
  return useSWR(key, fetchPanoptesUserGroup, SWRoptions)
}
