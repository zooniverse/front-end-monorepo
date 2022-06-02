import { panoptes } from '@zooniverse/panoptes-js'

export default async function getUsersByID (userIds = []) {
  if (userIds.length === 0) return []

  const query = {
    id: userIds.join(','),
    // Convert to string, e.g. ?id=111,222
    // If we pass an array, this will become ?id=111&id=222
  }

  return panoptes.get('/users', query)
    .then(response => response?.body?.users || [])
}
