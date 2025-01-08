import { useState } from 'react'

import { getBearerToken } from '@store/utils'

export default function usePanoptesAuth({ authClient }) {
  const [authorization, setAuthorization] = useState()

  async function checkAuth() {
    const token = await getBearerToken(authClient)
    if (token !== authorization) {
      setAuthorization(token)
    }
  }

  checkAuth()

  return authorization
}