import { useEffect, useState } from 'react'

import { useStores } from '@hooks'

export default function usePanoptesUser() {
  const { authClient } = useStores()
  const [user, setUser] = useState(null)

  useEffect(function () {
    async function checkUserSession() {
      const panoptesUser = await authClient.checkCurrent()
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
