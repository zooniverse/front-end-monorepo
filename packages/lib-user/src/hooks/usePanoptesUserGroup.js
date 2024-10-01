import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

import usePanoptesAuthToken from './usePanoptesAuthToken'

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

async function fetchPanoptesUserGroup({ groupId, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  const endpoint = `/user_groups/${groupId}`
  
  try {
    const { body } = await panoptes.get(endpoint, {}, { authorization })
    const { user_groups } = body
    const user_group = user_groups?.[0]
    return user_group
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function usePanoptesUserGroup({ adminMode, authUserId, groupId, membershipId }) {
  const token = usePanoptesAuthToken()
  const key = token && groupId ? { groupId, token } : null
  return useSWR(key, fetchPanoptesUserGroup, SWROptions)
}
