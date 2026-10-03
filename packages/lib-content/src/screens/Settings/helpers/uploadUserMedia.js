import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

const VALID_MEDIA_TYPES = ['avatar', 'profile_header']

// OK, so how do we upload user files (aka "a Media Resource that's
// associated with another Panoptes Resource") to Panoptes?
// 1. we send a POST request to e.g. /users/1234/avatar to create a new EMPTY
//    Media Resource.
// 2. In the POST's response, there's a URL where a file should be uploaded to.
//    Currently, there's no file there. Fortunately, the URL contains a magic
//    token that allows us to upload a file there.
//    e.g. https://panoptesuploadsstaging.blob.core.windows.net/public/user_avatar/beep-boop.png?token=1234&expires_in=5_seconds_from_now_or_whatever 
// 3. We then need to PUT the file that URL.

// ⚠️ Just remember that SVG files are a special case, and require some
// sanitisation before upload!

async function uploadUserMedia(userId, mediaType, file) {

  // Step 0: Initial sanity checks.

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new Error(`Invalid mediaType: ${mediaType}. Must be one of: ${VALID_MEDIA_TYPES.join(', ')}`)
  }

  if (!file) {
    throw new Error('No file provided.')
  }

  const token = await auth.checkBearerToken()
  if (!token) return null

  const authorization = `Bearer ${token}`

  // Fetch latest copy of user, to get deatils for If-Match header, to make PUT changes.
  const getResponse = await panoptes.get(`/users/${userId}/${mediaType}`, {}, { authorization })

  // TODO: sanitise SVG content!!!
  // PR REVIEWERS: IF YOU SEE THIS, DO NOT ALLOW THIS PR TO BE MERGED

  let postResponse, putResponse, uploadUrl

  const postHeaders = {
    authorization,
    etag: getResponse?.headers?.etag
  }
  const postBody = {
    media: {
      content_type: file.type
    }
  }

  console.log('+++ A. file: ', file)

  try {
    postResponse = await panoptes.post(`/users/${userId}/${mediaType}`, postBody, postHeaders)
    uploadUrl = postResponse?.body?.media?.[0]?.src
  } catch (error) {
    console.error(error)
    throw error
  }

  console.log('+++ B. uploadUrl: ', uploadUrl)

  const putHeaders = {
    'Content-Type': file.type,
    'x-ms-blob-type': 'BlockBlob',  // This is required for Azure storage.
  }
  const putBody = file

  try {
    putResponse = await fetch(uploadUrl, {
      method: 'PUT',
      putHeaders,
      body: putBody
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  console.log('+++ C. putResponse: ', putResponse)

  return putResponse?.status === 201 && postResponse?.status === 201
}

export default uploadUserMedia