/*
useUserMedia() is a hook for fetching Panoptes user data related to
_media files._ Specifically, you can get either the user's Profile Avatar or
Profile Header.

Input:
- An Object containing:
  - `userId` (string): user's ID.
  - `mediaType` (string): type of media we're interested in. Either `"avatar"`
    or `"profile_header"`

Output:
- Standard useSWR() output. See example in README.
- `swrOutput.data` will either be...
  - a Panoptes Media resource, OR
  - `null`, if user media resource doesn't exist.
 */

import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const VALID_MEDIA_TYPES = ['avatar', 'profile_header']

async function fetchUserMedia({ userId, mediaType }) {

  try {
    // Authorisation/authorization isn't required for fetching user media data, since this should all public.
    const { body } = await panoptes.get(`/users/${userId}/${mediaType}`)
    const media = body.media
    return media?.[0]
  } catch (err) {

    // Note: if the media doesn't exist (which is perfectly valid),
    // panoptes.get() will throw a 404 error.
    if (err.status === 404) return null

    console.error(err)
    throw err
  }
}

export default function useUserMedia({ userId, mediaType }) {
  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new Error(`Invalid mediaType: ${mediaType}. Must be one of: ${VALID_MEDIA_TYPES.join(', ')}`)
  }

  const key = { userId, mediaType }
  return useSWR(key, fetchUserMedia)
}