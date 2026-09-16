import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

async function updateUserData(newData = {}, userId) {
  const token = await auth.checkBearerToken()
  if (!token) return null

  const authorization = `Bearer ${token}`

  // PUT to panoptes /users endpoint requires an If-Match header, this is how to get it
  // and unfortunately means an extra network request
  const getResponse = await panoptes.get(`/users/${userId}`, {}, { authorization })
  const headers = {
    authorization,
    etag: getResponse?.headers?.etag
  }
  const putData = {
    users: newData
  }

  try {
    const response = await panoptes.put(`/users/${userId}`, putData, headers)
    const updatedUserResource = response?.body?.users?.[0]
    return updatedUserResource
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default updateUserData