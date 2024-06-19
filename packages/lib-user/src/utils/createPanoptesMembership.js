import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createPanoptesMembership(key, {
  arg: {
    groupId,
    joinToken,
    userId
  }
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  try {
    const { body } = await panoptes.post('/memberships',
      { memberships: {
        join_token: joinToken,
        links: {
          user: userId,
          user_group: groupId
        }
      }},
      { authorization }
    )
    return body
  } catch (error) {
    console.error(error)
    throw error
  }
}
