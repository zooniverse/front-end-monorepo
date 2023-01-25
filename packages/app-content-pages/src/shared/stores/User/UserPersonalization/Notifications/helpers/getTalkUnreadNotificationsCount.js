import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getUnreadNotificationsCount (authorization) {
  if (!authorization) return undefined

  const query = {
    delivered: false,
    page_size: 1
  }

  return talkAPI.get('/notifications', query, { authorization })
    .then(response => response?.body?.meta?.notifications?.count)
}
