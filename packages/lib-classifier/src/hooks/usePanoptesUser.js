import { auth } from '@zooniverse/panoptes-js'
import { useEffect, useState } from 'react'

import { getBearerToken } from '@store/utils'

async function decodeJWT(token) {
  let user = null
  let error = null
  const decodedToken = await auth.verify(token)
  const { data } = decodedToken
  error = decodedToken.error
  if (data) {
    user = {
      id: data.id.toString(),
      login: data.login,
      display_name: data.dname,
      admin: data.admin
    }
  }
  return { user, error }
}

async function fetchPanoptesUser(authClient) {
  try {
    const authorization = await getBearerToken(authClient)
    if (authorization) {
      const token = authorization.replace('Bearer ', '')
      const { user, error } = await decodeJWT(token)
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
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function checkUserSession() {
      setLoading(true)
      const panoptesUser = await fetchPanoptesUser(authClient)
      setUser(panoptesUser)
      setLoading(false)
    }

    checkUserSession()
    authClient.listen('change', checkUserSession)

    return function () {
      authClient.stopListening('change', checkUserSession)
    }
  }, [authClient])

  return { user, loading }
}
