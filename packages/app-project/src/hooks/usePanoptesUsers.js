import useSWR from 'swr'

import fetchUsers from '@helpers/fetchUsers'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

export default function usePanoptesUsers(query) {
  let key = null
  if (query && query.id) {
    key = query
  }
  return useSWR(key, fetchUsers, SWROptions)
}
