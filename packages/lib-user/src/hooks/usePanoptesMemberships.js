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
  await auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null 

  try {
    const { body } = await panoptes.get('/memberships', query, { authorization })
    return body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function usePanoptesMemberships({ authUserId, query, swrOptions = {} }) {
  const key = (query.user_id || query.user_group_id) && authUserId ? { query } : null
  const options = { ...SWROptions, ...swrOptions }
  return useSWR(key, fetchMemberships, options)
}
