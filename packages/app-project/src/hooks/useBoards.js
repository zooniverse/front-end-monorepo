import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchBoards({ query, token }) {
  const authorization = token ? `Bearer ${token}` : ''

  return talkAPI.get('/boards', query, { authorization })
    .then(response => response?.body?.boards)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function useBoards(query) {
  const token = usePanoptesAuthToken()

  let key = null
  if (query && query.section) {
    key = { query, token }
  }

  return useSWR(key, fetchBoards, SWROptions)
}
