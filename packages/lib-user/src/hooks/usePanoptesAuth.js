import { useEffect, useState } from 'react'

import { getBearerToken } from '@utils'

export default function usePanoptesAuth({ authClient, userID }) {
  const [authorization, setAuthorization] = useState()
  async function checkAuth() {
    const token = await getBearerToken(authClient)
    setAuthorization(token)
  }

  useEffect(function onUserChange() {
    checkAuth()
  }, [authClient, userID])

  return authorization
}
