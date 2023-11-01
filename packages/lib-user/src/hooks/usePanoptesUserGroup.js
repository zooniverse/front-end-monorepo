import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

// TODO: refactor with SWR

async function fetchPanoptesUserGroup(authClient, groupID) {
  try {
    const authorization = await getBearerToken(authClient)
    const response = await panoptes.get(`/user_groups/${groupID}`, {}, { authorization })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUserGroup({ authClient, groupID}) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function handleUserGroup() {
      setLoading(true)
      try {
        const data = await fetchPanoptesUserGroup(authClient, groupID)
        if (!ignore) {
          setData(data)
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

  return { data: data, error, isLoading: loading }
}
