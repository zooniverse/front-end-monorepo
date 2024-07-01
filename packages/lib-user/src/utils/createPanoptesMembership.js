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
    if (!response) {
      throw new Error('No response from Panoptes')
    }
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.status = response.status
      throw error
    }
    const { body } = response
    return body
  } catch (error) {
    console.error(error)
    throw error
  }
}
