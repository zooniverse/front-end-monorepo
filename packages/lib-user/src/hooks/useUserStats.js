import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuth } from './usePanoptesAuth'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function statsHost(env) {
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

const defaultEndpoint = '/classifications/users'

async function fetchUserStats({ endpoint, query, userID, authorization }) {
  const stats = statsHost(env)
  const queryParams = new URLSearchParams(query).toString()
  const headers = { authorization }
  
  try {
    const response = await fetch(`${stats}${endpoint}/${userID}?${queryParams}`, { headers })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useUserStats({ authClient, endpoint = defaultEndpoint, query, userID }) {
  const authorization = usePanoptesAuth({ authClient, userID })
  
  const key = (authorization && userID) ? { endpoint, query, userID, authorization } : null

  return useSWR(key, fetchUserStats, SWROptions)
}
