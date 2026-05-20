import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWROptions = {
  keepPreviousData: true, // Show previous data with a placeholder overtop when isLoading or isValidating
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
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

export default function useProjectStats(query, type) {
  const endpoint = type === 'count' ? '/classifications' : '/comments'
  const key = { endpoint, query }
  return useSWR(key, fetchStats, SWROptions)
}
