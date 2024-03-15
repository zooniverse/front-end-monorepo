import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuth } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPanoptesUserGroup({ groupId, authorization }) {
  const endpoint = `/user_groups/${groupId}`
  
  try {
    const response = await panoptes.get(endpoint, {}, { authorization })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesUserGroup({ authClient, groupId, userId }) {
  const authorization = usePanoptesAuth({ authClient, userId })
  const key = groupId ? { groupId, authorization } : null
  return useSWR(key, fetchPanoptesUserGroup, SWRoptions)
}
