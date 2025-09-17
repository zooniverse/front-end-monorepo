import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchComments(query) {
  return talkAPI.get('/comments', query)
    .then(response => response?.body?.comments)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export default function useComments(query) {
  let key = null
  if (query && query.discussion_id) {
    key = query
  }

  return useSWR(key, fetchComments, SWROptions)
}
