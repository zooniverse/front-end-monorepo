import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function deletePanoptesMembership(key, {
  arg: {
    membershipId
  }
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const membershipResponse = await panoptes.get(`/memberships/${membershipId}`, {}, { authorization })

  const headers = {
    authorization,
    etag: membershipResponse?.headers?.etag
  }

  const response = await panoptes.del(`/memberships/${membershipId}`, {}, headers)
  return response
}
