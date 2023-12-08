import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'

import { usePanoptesAuth } from '@hooks/index.js'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPanoptesUserGroup({ endpoint, groupID, authorization }) {
  if (groupID === undefined || authorization === undefined) {
    return undefined
  }
  if (groupID && authorization) {
    const response = await panoptes.get(endpoint, {}, { authorization })
    return response || {}
  }
  return null
}

export default function usePanoptesUserGroup({ authClient, groupID}) {
  const authorization = usePanoptesAuth({ authClient })
  const endpoint = `/user_groups/${groupID}`
  const key = { endpoint, groupID, authorization }
  return useSWR(key, fetchPanoptesUserGroup, SWRoptions)
}
