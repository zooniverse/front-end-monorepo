import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getTalkRoles (userIds = [], section = '') {
  if (userIds.length === 0 || section === '') return []

  const query = {
    user_id: userIds.join(','),
    section: ['zooniverse', section].join(','),
    is_shown: true,
  }

  return talkAPI.get('/roles', query)
    .then(response => response?.body?.roles || [])
}
