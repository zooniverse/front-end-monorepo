import useSWR from 'swr'

import fetchDiscussions from '@helpers/fetchDiscussions'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

export default function useDiscussions(query) {
  let key = null
  
  if (query && query.section) {
    key = { query }
  }
  
  return useSWR(key, fetchDiscussions, SWROptions)
}
