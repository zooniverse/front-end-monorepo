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

async function fetchPanoptesUserGroup({ endpoint, groupId, authorization }) {
  if (groupId === undefined || authorization === undefined) {
    return undefined
  }
  if (groupId && authorization) {
    const response = await panoptes.get(endpoint, {}, { authorization })
    return response || {}
  }
  return null
}

export function usePanoptesUserGroup({ authClient, groupId}) {
  const authorization = usePanoptesAuth({ authClient })
  const endpoint = `/user_groups/${groupId}`
  const key = { endpoint, groupId, authorization }
  return useSWR(key, fetchPanoptesUserGroup, SWRoptions)
}
