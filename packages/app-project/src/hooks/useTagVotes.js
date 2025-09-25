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

async function fetchTagVotes({ query, token }) {
  const authorization = `Bearer ${token}`

  const response = await talkAPI.get('/tag_votes', query, { authorization })

  return response?.body?.tag_votes
}

export default function useTagVotes(query) {
  const token = usePanoptesAuthToken()

  const key = token && query ? { query, token } : null

  return useSWR(key, fetchTagVotes, SWRoptions)
}
