import useSWR from 'swr'

import { fetchPanoptesUsers } from '@utils'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

export function usePanoptesUsers(query) {
  let key = null
  if (query && query.id) {
    key = query
  }
  return useSWR(key, fetchPanoptesUsers, SWROptions)
}
