import auth from 'panoptes-client/lib/auth'
import { useEffect, useState } from 'react'

async function fetchPanoptesUser() {
  const panoptesUser = await auth.checkCurrent()
  if (panoptesUser) {
    // A lot of user properties are not needed in lib-user, so we only return the ones we need; edit as needed.
    const { admin, avatar_src, display_name, id, login } = panoptesUser
    return { admin, avatar_src, display_name, id, login }
  }

  return null
}

export function usePanoptesUser(authClient) {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function checkUserSession() {
      setLoading(true)
      try {
        const panoptesUser = await fetchPanoptesUser()
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
