import { useEffect, useState } from 'react'

import { useStores } from '@hooks'
import { getBearerToken } from '@store/utils'

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