import useSWR from 'swr'

import { usePanoptesAuth } from '@hooks'

// TODO: refactor for stats hosts (staging, production, etc.)

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const defaultEndpoint = '/classifications/users'
const defaultQuery = {
  // end_date: null,
  period: 'year',
  project_contributions: true,
  // project_id: null,
  // start_date: null,
  time_spent: true,
  // workflow_id: null,
}

async function fetchUserStats({ endpoint, query, userID, authorization }) {
  const queryParams = new URLSearchParams(query).toString()
  const headers = { authorization }
  
  try {
    const response = await fetch(`https://eras-staging.zooniverse.org${endpoint}/${userID}?${queryParams}`, { headers })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function useUserStats({ authClient, endpoint = defaultEndpoint, query = defaultQuery, userID }) {
  const authorization = usePanoptesAuth({ authClient, userID })
  
  const key = authorization ? { endpoint, query, userID, authorization } : null

  return useSWR(key, fetchUserStats, SWROptions)
}
