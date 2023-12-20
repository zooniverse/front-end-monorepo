import { useEffect, useState } from 'react'

import { getBearerToken } from '@utils/index.js'

export default function usePanoptesAuth({ authClient, userID }) {
  const [authorization, setAuthorization] = useState()

  useEffect(function onUserChange() {
    async function checkAuth() {
      const token = await getBearerToken(authClient)
      setAuthorization(token)
    }

    checkAuth()
  }, [authClient, userID])

  return authorization
}
