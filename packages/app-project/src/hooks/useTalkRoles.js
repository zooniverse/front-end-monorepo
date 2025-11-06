import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchTalkRoles(query) {
  return talkAPI.get('/roles', query)
    .then(response => response?.body?.roles)
    .catch(error => {
      console.error(error)
      throw error
    })
} 

export default function useTalkRoles(query) {
  let key = null
  if (query && query.user_id) {
    key = query
  }

  return useSWR(key, fetchTalkRoles, SWROptions)
}
