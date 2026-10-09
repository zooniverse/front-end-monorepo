/*
updateUserData() is a function for _saving_ changes to Panoptes.

Input: (separate args)
1. (object): an object with key-value pairs that we want to change.
2. (string): user's ID.

Output:
- Updated User resource, on success.

Potentially throws:
- API errors from Panoptes.

Notes:
- Performs a GET to Panoptes (to get some validation data for the header),
  then a PUT with the new data.
- Protip: this isn't an SWR hook, so you'll need to manually keep track of the
  processing/saving state.
 */

import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

async function updateUserData(newData = {}, userId) {
  const token = await auth.checkBearerToken()
  if (!token) return null

  const authorization = `Bearer ${token}`

  // Fetch latest copy of user, to get deatils for If-Match header, to make PUT changes.
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