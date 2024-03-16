import { useEffect, useState } from 'react'

import { getBearerToken } from '@utils'

export function usePanoptesAuth({ authClient, authUserId }) {
  const [authorization, setAuthorization] = useState()
  async function checkAuth() {
    const token = await getBearerToken(authClient)
    setAuthorization(token)
  }

  useEffect(function onUserChange() {
    checkAuth()
  }, [authClient, authUserId])

  return authorization
}
