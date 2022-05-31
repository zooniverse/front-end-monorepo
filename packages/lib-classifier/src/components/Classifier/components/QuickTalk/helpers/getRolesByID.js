import { env, panoptes } from '@zooniverse/panoptes-js'
import getTalkHost from './getTalkHost'

async function getRolesByID (userIds = [], section = '') {
  if (userIds.length === 0 || section === '') return []

  const query = {
    user_id: userIds.join(','),
    section: ['zooniverse', section].join(','),
    is_shown: true,
  }

  return panoptes.get('/roles', query, {}, getTalkHost(env))
    .then(response => response?.body?.roles || [])
}

export default getRolesByID
