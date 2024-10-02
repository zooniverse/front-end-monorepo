import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'
import usePanoptesAuthToken from './usePanoptesAuthToken'

const defaultEndpoint = '/classifications/users'

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

async function fetchStats({
  endpoint,
  query,
  sourceId,
  token
}) {
  const authorization = `Bearer ${token}`
  const headers = { authorization }

  const stats = statsHost(env)
  const queryParams = new URLSearchParams(query).toString()
  
  try {
    const response = await fetch(`${stats}${endpoint}/${sourceId}?${queryParams}`, { headers })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function useStats({
  endpoint = defaultEndpoint,
  query = {},
  sourceId
}) {
  const token = usePanoptesAuthToken()
  const key = token && sourceId ? { endpoint, query, sourceId, token } : null
  return useSWR(key, fetchStats, SWROptions)
}
