import { useEffect, useState } from 'react'

import { getBearerToken } from '@utils/index.js'

// TODO: refactor with SWR

export default function useUserStats({ authClient, userID }) {
  const [error, setError] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function fetchUserStats() {
      setLoading(true)
      setUserStats(null)
      
      try {
        const authorization = await getBearerToken(authClient)
        const headers = { authorization }
        const response = await fetch(`https://eras-staging.zooniverse.org/classifications/users/${userID}?period=week`, { headers })  
        const data = await response.json()
        if (!ignore) {
          setUserStats(data)
        }
      } catch (error) {
        setError(error)
      }
      
      setLoading(false)
    }

    let ignore = false
    if (authClient && userID) {
      fetchUserStats(authClient, userID)
    }
    return () => {
      ignore = true
    }
  }, [authClient, userID])

  return { data: userStats, error, isLoading: loading }
}
