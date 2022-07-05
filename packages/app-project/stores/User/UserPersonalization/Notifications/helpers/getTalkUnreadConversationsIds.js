import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getUnreadConversationsIds (authorization) {
  if (!authorization) return undefined

  let unreadConversationsIds = []

  const getUnreadConversationsIds = async (page = 1) => {
    const query = {
      is_unread: true,
      page: page
    }

    const response = await talkAPI.get('/conversations', query, { authorization })
    const { meta, conversations } = response.body

    unreadConversationsIds = unreadConversationsIds.concat(
      conversations
        .filter(conversation => conversation.is_unread)
        .map(conversation => conversation.id)
    )

    if (meta.next_page) {
      return getUnreadConversationsIds(meta.next_page)
    }

    return unreadConversationsIds
  }

  return getUnreadConversationsIds(1)
}
