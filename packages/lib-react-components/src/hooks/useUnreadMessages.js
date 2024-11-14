import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const isBrowser = typeof window !== 'undefined'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

if (isBrowser) {
  auth.checkCurrent()
}

async function fetchUnreadMessageCount({ endpoint = '/conversations' }) {
  await auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return 0

  let unreadConversationsIds = []

  async function getConversations (page = 1) {
    const query = {
      unread: true,
      page: page
    }

    const response = await talkAPI.get(endpoint, query, { authorization })
    const { meta, conversations } = response?.body || {}

    if (conversations && conversations.length) {
      unreadConversationsIds = unreadConversationsIds.concat(
        conversations.map(conversation => conversation.id)
      )
    }

    if (meta?.next_page) {
      return getConversations(meta.next_page)
    }

    return unreadConversationsIds
  }

  await getConversations(1)
  return unreadConversationsIds.length
}

export default function useUnreadMessages(user) {
  let key = null
  if (user?.login) {
    key = {
      user,
      endpoint: '/conversations'
    }
  }
  return useSWR(key, fetchUnreadMessageCount, SWROptions)
}
