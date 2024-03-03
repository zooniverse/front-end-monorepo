import { env } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const defaultEndpoint = '/classifications/users'

const isBrowser = typeof window !== 'undefined'

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

if (isBrowser) {
  auth.checkCurrent()
}

async function fetchStats({ endpoint, query, sourceId }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  const stats = statsHost(env)
  const queryParams = new URLSearchParams(query).toString()
  const headers = { authorization }
  
  try {
    const response = await fetch(`${stats}${endpoint}/${sourceId}?${queryParams}`, { headers })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useStats({ endpoint = defaultEndpoint, query = {}, sourceId }) {
  const key = sourceId ? { endpoint, query, sourceId } : null
  return useSWR(key, fetchStats, SWROptions)
}
