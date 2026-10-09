/*
Function for _uploading_ (or replacing) Panoptes user data related to _media files._
(Either the Profile Avatar or Profile Header.)

Input:
- `userId` (string): user's ID.
- `mediaType` (string): type of media we're interested in. Either `"avatar"`
  or `"profile_header"`
- `file` (Blob): file to be uploaded to Panoptes.
  - ⚠️ until we add modify this function to sanitises SVG files, we will only
    accept PNG files.

Output:
- `true` on success.

Potentially throws:
- Input errors. (Invalid media types, invalid file types)
- API errors from Panoptes.
- API errors from Azure storage.
 */

import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

const VALID_MEDIA_TYPES = ['avatar', 'profile_header']

/*
OK, so how do we upload user files (aka "a Media Resource that's
associated with another Panoptes Resource") to Panoptes?
1. we send a POST request to e.g. /users/1234/avatar to create a new EMPTY
   Media Resource.
2. In the POST's response, there's a URL where a file should be uploaded to.
   Currently, there's no file there. Fortunately, the URL contains a magic
   token that allows us to upload a file there.
   e.g. https://panoptesuploadsstaging.blob.core.windows.net/public/user_avatar/beep-boop.png?token=1234&expires_in=5_seconds_from_now_or_whatever 
3. We then need to PUT the file that URL.

⚠️ Just remember that SVG files are a special case, and require some
sanitisation before upload!
 */

async function uploadUserMedia(userId, mediaType, file) {

  // Step 1: Initialisation and sanity checks.

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new Error(`Invalid mediaType: ${mediaType}. Must be one of: ${VALID_MEDIA_TYPES.join(', ')}`)
  }

  if (!userId) { throw new Error('No user ID provided.') }
  if (!file) { throw new Error('No file provided.') }

  // ⚠️ DEV NOTE: until we add modify this function to sanitises SVG files, we
  // will only accept PNG files. This means that, for now, uploadUserMedia() is
  // meant to be used exclusively in conjunction with resizeImageData().
  if (file.type !== 'image/png') {
    throw new Error("Development error: uploadUserMedia() currently only accepts PNGs. If you wish to upload more image file types, this function must first be modified to a sanitise SVG input.")
  }

  const token = await auth.checkBearerToken()
  if (!token) return null
  const authorization = `Bearer ${token}`

  let postResponse, putResponse, uploadUrl

  // Step 2: Create a new Media Resource, aka the POST request to Panoptes.
  // The new media resource will be empty, but will contain an upload URL with a
  // magic token. For a brief window of time, we'll be able to upload a file to
  // that URL.
  // Oh, and to be clear, that upload URL will be to our own Microsoft Azure
  // storage.

  const postHeaders = {
    authorization,
  }
  const postBody = {
    media: {
      content_type: file.type
    }
  }

  try {
    postResponse = await panoptes.post(`/users/${userId}/${mediaType}`, postBody, postHeaders)
    uploadUrl = postResponse?.body?.media?.[0]?.src
    if (!uploadUrl) throw new Error('Panoptes didn\'t provide an upload URL for media file.')
  } catch (error) {
    console.error(error)
    throw error
  }

  // Step 3: Upload the media file, aka the PUT request to Azure.

  const putHeaders = {
    'Content-Type': file.type,
    'x-ms-blob-type': 'BlockBlob',  // This is required for Azure storage.
  }
  const putBody = file

  try {
    putResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: putHeaders,
      body: putBody
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  // Step Finale: success?

  return putResponse?.status === 201 && postResponse?.status === 201
}

export default uploadUserMedia