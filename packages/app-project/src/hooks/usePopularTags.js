import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPopularTags(query) {
  return talkAPI.get('/tags/popular', query)
    .then(response => response?.body?.popular)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function usePopularTags(query) {
  let key = null
  if (query && query.section) {
    key = query
  }

  return useSWR(key, fetchPopularTags, SWRoptions)
}
