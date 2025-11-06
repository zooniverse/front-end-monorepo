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

async function fetchMentions({ query, token }) {
  const authorization = token ? `Bearer ${token}` : ''

  try {
    const { body } = await talkAPI.get('/mentions', query, { authorization })
    const mentionsWithComment = body.mentions.map(mention => {
      const comment = body.linked.comments.find(c => c.id === mention.comment_id)
      return {
        ...mention,
        comment
      }
    })
    return mentionsWithComment || []
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function useMentions(query) {
  const token = usePanoptesAuthToken()

  let key = null
  if (query && query.section) {
    key = { query, token }
  }

  return useSWR(key, fetchMentions, SWROptions)
}
