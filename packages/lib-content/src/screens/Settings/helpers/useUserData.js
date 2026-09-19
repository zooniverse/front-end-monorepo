import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuthToken } from '@zooniverse/react-components/hooks'

// Use default SWR options.
const SWROptions = {}

async function fetchUserData({ login, token }) {
  const authorization = `Bearer ${token}`
  const query = { login }

  try {
    const { body } = await panoptes.get('/users', query, { authorization })
    const users = body.users
    return users?.[0]
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function useUserData({ login }) {
  // Use login and authentication token as SWR key.
  // ⚠️ WARNING: Panoptes Auth Token can change if user is logged in long
  // enough to trigger an automatic refresh. This MAY lead to shenanigans.
  const token = usePanoptesAuthToken()
  const key = (token && login)
    ? { login, token }
    : null

  return useSWR(key, fetchUserData, SWROptions)
}