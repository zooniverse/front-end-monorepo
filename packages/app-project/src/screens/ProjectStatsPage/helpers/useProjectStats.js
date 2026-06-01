import { env } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWROptions = {
  // keepPreviousData: true, // Ideally we'd be able to use this for the UX, but because BarChart calculates compeleteData
  // based on endDate and startDate, those props change before previousData resolves to data, and causes mismatches in Grommet's DataChart :(
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
  const key = type ? { endpoint, query } : null
  return useSWR(key, fetchStats, SWROptions)
}
