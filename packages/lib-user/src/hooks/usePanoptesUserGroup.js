import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils'

// TODO: refactor with SWR

async function fetchPanoptesUserGroup(authClient, groupID) {
  try {
    const authorization = await getBearerToken(authClient)
    const response = await panoptes.get(`/user_groups`, { id: groupID }, { authorization })
    const [userGroup] = response.body.user_groups
    return userGroup    
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUserGroup(authClient, groupID) {
  const [error, setError] = useState(null)
  const [userGroup, setUserGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function handleUserGroup() {
      setLoading(true)
      try {
        const panoptesUserGroup = await fetchPanoptesUserGroup(authClient, groupID)
        if (!ignore) {
          setUserGroup(panoptesUserGroup)
        }
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }

    let ignore = false
    if (groupID) {
      handleUserGroup()
    }
    return function () {
      ignore = true
    }
  }, [authClient, groupID])

  return { data: userGroup, error, isLoading: loading }
}
