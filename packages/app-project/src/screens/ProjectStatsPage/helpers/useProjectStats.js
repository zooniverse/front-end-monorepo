import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

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
  query
}) {
  const host = statsHost(env)
  const queryParams = new URLSearchParams(query).toString()

  try {
    const response = await fetch(`${host}${endpoint}?${queryParams}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function useProjectStats(query) {
  const key = { endpoint: '/classifications', query }
  return useSWR(key, fetchStats, SWROptions)
}
