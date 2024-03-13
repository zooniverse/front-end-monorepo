import { useEffect, useState } from 'react'

import { getBearerToken } from '../utils'

// TODO: refactor with SWR

export function useGroupStats({ authClient, groupId }) {
  const [error, setError] = useState(null)
  const [groupStats, setGroupStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function fetchGroupStats() {
      setLoading(true)
      setGroupStats(null)
      
      try {
        const authorization = await getBearerToken(authClient)
        const headers = { authorization }
        const response = await fetch(`https://eras-staging.zooniverse.org/classifications/user_groups/${groupId}?individual_stats_breakdown=true`, { headers })  
        const data = await response.json()
        if (!ignore) {
          setGroupStats(data)
        }
      } catch (error) {
        setError(error)
      }
      
      setLoading(false)
    }

    let ignore = false
    if (authClient && groupId) {
      fetchGroupStats(authClient, groupId)
    }
    return () => {
      ignore = true
    }
  }, [authClient, groupId])

  return { data: groupStats, error, isLoading: loading }
}
