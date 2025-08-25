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

async function fetchDiscussions({ query, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  try {
    const { body } = await talkAPI.get('/discussions', query, { authorization })
    return body.discussions || []
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function useDiscussions(query) {
  const token = usePanoptesAuthToken()
  const key = { query, token }
  return useSWR(key, fetchDiscussions, SWROptions)
}
