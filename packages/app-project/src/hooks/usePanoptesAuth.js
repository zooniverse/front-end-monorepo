import auth from 'panoptes-client/lib/auth'
import { useEffect, useState } from 'react'

export default function usePanoptesAuth(userID) {
  const [authorization, setAuthorization] = useState()

  async function checkAuth() {
    const token = await auth.checkBearerToken()
    const bearerToken = token ? `Bearer ${token}` : ''
    setAuthorization(bearerToken)
  }

  useEffect(function onUserChange() {
    checkAuth()
  }, [userID])

  return authorization
}