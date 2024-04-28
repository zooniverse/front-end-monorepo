import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createPanoptesMembership({
  groupId,
  joinToken,
  userId
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const response = await panoptes.post('/memberships',
    { memberships: {
      join_token: joinToken,
      links: {
        user: userId,
        user_group: groupId
      }
    }},
    { authorization }
  )
  return response
}
