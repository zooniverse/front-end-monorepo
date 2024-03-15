import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const isBrowser = typeof window !== 'undefined'

const SWRoptions = {
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
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const endpoint = `/user_groups/${groupId}`
  
  try {
    const response = await panoptes.get(endpoint, {}, { authorization })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export function usePanoptesUserGroup({ groupId }) {
  const key = groupId ? { groupId } : null
  return useSWR(key, fetchPanoptesUserGroup, SWRoptions)
}
