import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getUnreadConversationsIds (authorization) {
  if (!authorization) return undefined

  let unreadConversationsIds = []

  const getConversations = async (page = 1) => {
    const query = {
      unread: true,
      page: page
    }

    const response = await talkAPI.get('/conversations', query, { authorization })
    const { meta, conversations } = response?.body || {}

    if (conversations && conversations.length > 0) {
      unreadConversationsIds = unreadConversationsIds.concat(
        conversations.map(conversation => conversation.id)
      )
    }

    if (meta?.next_page) {
      return getUnreadConversationsIds(meta.next_page)
    }

    return unreadConversationsIds
  }

  return getConversations(1)
}
