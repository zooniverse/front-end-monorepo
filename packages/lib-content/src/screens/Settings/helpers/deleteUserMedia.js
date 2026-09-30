import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

const VALID_MEDIA_TYPES = ['avatar', 'profile_header']

async function deleteUserMedia(userId, mediaType) {
  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new Error(`Invalid mediaType: ${mediaType}. Must be one of: ${VALID_MEDIA_TYPES.join(', ')}`)
  }

  const token = await auth.checkBearerToken()
  if (!token) return null

  const authorization = `Bearer ${token}`

  // Fetch latest copy of user, to get deatils for If-Match header, to make PUT changes.
  const getResponse = await panoptes.get(`/users/${userId}/${mediaType}`, {}, { authorization })

  const headers = {
    authorization,
    etag: getResponse?.headers?.etag
  }

  try {
    const response = await panoptes.del(`/users/${userId}/${mediaType}`, {}, headers)
    return response?.status === 204
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default deleteUserMedia