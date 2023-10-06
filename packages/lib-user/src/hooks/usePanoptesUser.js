import { useEffect, useState } from 'react'
import { auth } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

async function fetchPanoptesUser(authClient) {
  try {
    const authorization = await getBearerToken(authClient)
    if (authorization) {
      const { user, error } = await auth.decodeJWT(authorization)
      if (user) {
        return user
      }
      if (error) {
        throw error
      }
    }
    return await authClient.checkCurrent()
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUser(authClient) {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function checkUserSession() {
      setLoading(true)
      try {
        const panoptesUser = await fetchPanoptesUser(authClient)
        setUser(panoptesUser)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }

    checkUserSession()
    authClient.listen('change', checkUserSession)

    return function () {
      authClient.stopListening('change', checkUserSession)
    }
  }, [authClient])

  return { data: user, error, isLoading: loading }
}
