import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchVotableTags({ query, token }) {
  const authorization = `Bearer ${token}`

  const response = await talkAPI.get('/votable_tags', query, { authorization })
  
  return response?.body?.votable_tags
}

export default function useVotableTags(query) {
  const token = usePanoptesAuthToken()
  
  const key = query ? { query, token } : null

  return useSWR(key, fetchVotableTags, SWRoptions)
}
