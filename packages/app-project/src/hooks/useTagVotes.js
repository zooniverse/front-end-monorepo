import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false, // can be false because its unlikely a user will change
                           // their own tagVotes on one subject in multiple browser tabs
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchTagVotes({ query, token }) {
  const authorization = `Bearer ${token}`

  let tagVotesAccumulator = []
  
  async function getTagVotes(page = 1) {
    try {
      const response = await talkAPI.get('/tag_votes', { page, ...query }, { authorization })
      const { meta, tag_votes: tagVotes } = response?.body || {}

      if (tagVotes && tagVotes.length) {
        tagVotesAccumulator = tagVotesAccumulator.concat(tagVotes)
      }

      if (meta?.tag_votes?.next_page) {
        return getTagVotes(meta.tag_votes.next_page)
      }

      return tagVotesAccumulator
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  await getTagVotes(1)
  return tagVotesAccumulator
}

export default function useTagVotes(query) {
  const token = usePanoptesAuthToken()

  const key = token && query ? { query, token } : null

  return useSWR(key, fetchTagVotes, SWRoptions)
}
