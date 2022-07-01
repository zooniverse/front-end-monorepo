import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getUnreadConversationsCount (authorization) {
  if (!authorization) return undefined

  const query = {
    delivered: false,
    page_size: 1
  }

  return talkAPI.get('/conversations', query, { authorization })
    .then(response => response?.body?.meta?.conversations?.count)
}
