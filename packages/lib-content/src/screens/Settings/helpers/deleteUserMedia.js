/*
deleteUserMedia() is a function for _deleting_ Panoptes user data related to
_media files._ (Either the Profile Avatar or Profile Header.)

Input: (separate args)
1. (string): user's ID.
2. (string): type of media we're interested in. Either `"avatar"` or
   `"profile_header"`

Output:
- `true` on successful delete.

Potentially throws:
- API errors from Panoptes.

Notes:
- Performs a GET to Panoptes (to get some validation data for the header),
  then a DELETE.
- Protip: this isn't an SWR hook, so you'll need to manually keep track of the
  processing/saving state.
 */

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

  // Fetch latest copy of user, to get deatils for If-Match header, to make DELETE changes.
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