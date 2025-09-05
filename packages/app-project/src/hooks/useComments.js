import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchComments({ query, token }) {
  const authorization = token ? `Bearer ${token}` : ''

  return talkAPI.get('/comments', query, { authorization })
    .then(response => response?.body?.comments)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function useComments(query) {
  const token = usePanoptesAuthToken()
  
  const key = query ? { query, token } : null

  return useSWR(key, fetchComments, SWROptions)
}
