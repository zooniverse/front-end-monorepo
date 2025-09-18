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

async function fetchPopularTags({ query, token }) {
  const authorization = `Bearer ${token}`

  const response = await talkAPI.get('/tags/popular', query, { authorization })

  return response?.body?.popular
}

export default function usePopularTags(query) {
  const token = usePanoptesAuthToken()

  const key = query ? { query, token } : null

  return useSWR(key, fetchPopularTags, SWRoptions)
}
