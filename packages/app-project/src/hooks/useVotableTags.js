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
  let votableTagsAccumulator = []

  async function getVotableTags(page = 1) {
    try {
      const response = await talkAPI.get('/votable_tags', { page, ...query })

      const { meta, votable_tags: votableTags } = response?.body || {}

      if (votableTags && votableTags.length) {
        votableTagsAccumulator = votableTagsAccumulator.concat(votableTags)
      }

      if (meta?.votable_tags?.next_page) {
        return getVotableTags(meta.votable_tags.next_page)
      }

      return votableTagsAccumulator
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  await getVotableTags(1)
  return votableTagsAccumulator
}

export default function useVotableTags(query) {
  let key = null
  if (query && query.section) {
    key = query
  }

  return useSWR(key, fetchVotableTags, SWRoptions)
}
