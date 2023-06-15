import { auth } from '@zooniverse/panoptes-js'
import { useEffect, useState } from 'react'

import { useStores } from '@hooks'
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

export default function usePanoptesUser() {
  const { authClient } = useStores()
  const [user, setUser] = useState(null)

  useEffect(function () {
    async function checkUserSession() {
      const panoptesUser = await fetchPanoptesUser(authClient)
      setUser(panoptesUser)
    }

    checkUserSession()
    authClient.listen('change', checkUserSession)

    return function () {
      authClient.stopListening('change', checkUserSession)
    }
  }, [authClient])

  return user
}
