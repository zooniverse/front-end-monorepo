import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuth } from '@hooks'

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
  authorization
}) {
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

export function useStats({
  authClient,
  endpoint = defaultEndpoint,
  query = {},
  sourceId,
  userId
}) {
  const authorization = usePanoptesAuth({ authClient, userId })
  const publicOrAuthorized = userId ? !!authorization : true

  const key = (sourceId && publicOrAuthorized) ? { endpoint, query, sourceId, authorization } : null
  return useSWR(key, fetchStats, SWROptions)
}
