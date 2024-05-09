import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function deletePanoptesUserGroup({ groupId, etag }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const headers = {
    authorization,
    etag
  }

  const response = await panoptes.del(`/user_groups/${groupId}`, {}, headers)
  return response
}
