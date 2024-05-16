import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function deletePanoptesUserGroup({ groupId }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const groupResponse = await panoptes.get(`/user_groups/${groupId}`, {}, { authorization })

  const headers = {
    authorization,
    etag: groupResponse?.headers?.etag
  }

  const response = await panoptes.del(`/user_groups/${groupId}`, {}, headers)
  return response
}
