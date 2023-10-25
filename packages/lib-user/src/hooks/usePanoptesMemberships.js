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

async function fetchGroupRoles({ endpoint, userID, includeGroups, authorization }) {
  // userID and auth are undefined while loading
  if (userID === undefined || authorization === undefined) {
    return undefined
  }
  // logged in
  if (userID && authorization) {
    const query = includeGroups ? { include: 'user_group', user_id: userID } : { user_id: userID }
    const { body } = await panoptes.get(endpoint, query, { authorization })
    return body || {}
  }
  // logged out
  return null
}

export default function usePanoptesGroupRoles({ authClient, userID, includeGroups = false }) {
  const authorization = usePanoptesAuth({ authClient, userID })
  const endpoint = '/memberships'
  const key = { endpoint, userID, includeGroups, authorization }
  return useSWR(key, fetchGroupRoles, SWRoptions)
}
