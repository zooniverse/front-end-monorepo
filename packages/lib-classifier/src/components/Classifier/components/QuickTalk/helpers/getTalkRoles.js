import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getTalkRoles({
  userIds = [],
  project
}) {
  if (userIds.length === 0 || !project) return []

  const query = {
    user_id: userIds.join(','),
    section: ['zooniverse', `project-${project.id}`].join(','),
    is_shown: true,
  }

  return talkAPI.get('/roles', query)
    .then(response => response?.body?.roles || [])
}
