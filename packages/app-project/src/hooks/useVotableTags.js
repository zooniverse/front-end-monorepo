import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchVotableTags(query) {
  return talkAPI.get('/votable_tags', query)
    .then(response => response?.body?.votable_tags)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function useVotableTags(query) {
  let key = null
  if (query && query.section) {
    key = query
  }

  return useSWR(key, fetchVotableTags, SWRoptions)
}
