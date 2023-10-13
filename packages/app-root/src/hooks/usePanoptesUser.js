import auth from 'panoptes-client/lib/auth'
import { auth as authHelpers } from '@zooniverse/panoptes-js'
import { useEffect, useState } from 'react'

if (typeof window !== 'undefined') {
  auth.checkCurrent()
}

async function fetchPanoptesUser() {
  try {
    const authorization = await auth.checkBearerToken()
    /* 
      Use crypto.subtle as a proxy for checking for SSL.
      It will only exist for https:// URLs.
    */
    const isSecure = crypto?.subtle
    if (authorization && isSecure) {
      const { user, error } = await authHelpers.decodeJWT(authorization)
      if (user) {
        return user
      }
      if (error) {
        throw error
      }
    }
  } catch (error) {
    console.log(error)
  }
  return await auth.checkCurrent()
}

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedUserJSON = localStorage?.getItem('panoptes-user')
let user = storedUserJSON && JSON.parse(storedUserJSON)
if (user === null) {
  user = undefined
}

export default function usePanoptesUser() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function checkUserSession() {
      setLoading(true)
      try {
        const panoptesUser = await fetchPanoptesUser()
        if (panoptesUser) {
          const { admin, avatar_src, display_name, id, login } = panoptesUser
          user = { admin, avatar_src, display_name, id, login }
          localStorage?.setItem('panoptes-user', JSON.stringify(user))
        } else {
          user = undefined
          localStorage?.removeItem('panoptes-user')
        }
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }

    if (typeof window !== 'undefined') {
      checkUserSession()
    }
    auth.listen('change', checkUserSession)

    return function () {
      auth.stopListening('change', checkUserSession)
    }
  }, [])

  return { data: user, error, isLoading: loading }
}
