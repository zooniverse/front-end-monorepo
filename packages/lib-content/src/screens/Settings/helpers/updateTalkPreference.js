/*
updateTalkPreference() is a function for _saving_ changes to the Talk API.

Input:
1. (object): an object with key-value pairs that we want to change.
2. (string): Talk Preference resource's ID.

Output:
- TODO ???

Potentially throws:
- API errors from Talk API.

Notes:
- Performs a GET to Talk API (to get some validation data for the header),
  then a PUT with the new data.
- Protip: this should be used with an optimistic UI pattern, since we're
  changing only one variable at a time via checkboxes or radio buttons.
 */

import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

async function updateTalkPreference (newData = {}, talkPreferenceId) {
  console.log('+++ TEST', newData, talkPreferenceId)

  const token = await auth.checkBearerToken()
  if (!token) return null

  const authorization = `Bearer ${token}`

  // Fetch latest copy of Talk Preference resource, to get details for If-Match header, to make PUT changes.
  const getResponse = await talkAPI.get(`/subscription_preferences/${talkPreferenceId}`, {}, { authorization })

  const headers = {
    authorization,
    etag: getResponse?.headers?.etag
  }

  const putData = {
    subscription_preferences: newData
  }

  try {
    const response = await talkAPI.put(`/subscription_preferences/${talkPreferenceId}`, putData, headers)
    const updatedResource = response?.body?.subscription_preferences?.[0]
    return updatedResource
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default updateTalkPreference