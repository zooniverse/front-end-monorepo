import auth from 'panoptes-client/lib/auth'
import { auth as authHelpers } from '@zooniverse/panoptes-js'

/**
  Get a Panoptes user from a Panoptes JSON Web Token (JWT), if we have one, or from
  the Panoptes API otherwise.
*/
export default async function fetchPanoptesUser({ user: storedUser }) {
  try {
    const jwt = await auth.checkBearerToken()
    /*
      `crypto.subtle` is needed to decrypt the Panoptes JWT.
      It will only exist for https:// URLs.
    */
    const isSecure = crypto?.subtle
    if (jwt && isSecure) {
      /*
        avatar_src isn't encoded in the Panoptes JWT, so we need to add it.
        https://github.com/zooniverse/panoptes/issues/4217
      */
      const { user, error } = await authHelpers.decodeJWT(jwt)
      if (user) {
        const { admin, display_name, id, login } = user
        return {
          avatar_src: storedUser?.avatar_src,
          ...user
        }
      }
      if (error) {
        throw error
      }
    }
  } catch (error) {
    console.log(error)
  }
  const panoptesUser = await auth.checkCurrent()
  if (panoptesUser) {
    const { admin, avatar_src, display_name, id, login } = panoptesUser
    return { admin, avatar_src, display_name, id, login }
  }

  return {}
}
