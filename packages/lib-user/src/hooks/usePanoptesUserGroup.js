import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

// TODO: refactor with SWR

async function fetchPanoptesUserGroup(authClient, groupID) {
  try {
    const authorization = await getBearerToken(authClient)
    const response = await panoptes.get(`/user_groups/${groupID}`, {}, { authorization })
    const headers = response.headers
    const [userGroup] = response.body.user_groups
    return { headers, userGroup }
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUserGroup(authClient, groupID) {
  const [error, setError] = useState(null)
  const [userGroup, setUserGroup] = useState(null)
  const [headers, setHeaders] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function handleUserGroup() {
      setLoading(true)
      try {
        const { headers, userGroup } = await fetchPanoptesUserGroup(authClient, groupID)
        if (!ignore) {
          setHeaders(headers)
          setUserGroup(userGroup)
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

  return { data: userGroup, error, headers, isLoading: loading }
}
