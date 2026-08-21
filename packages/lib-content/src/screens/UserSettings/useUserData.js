import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

import { usePanoptesAuthToken } from '@zooniverse/react-components/hooks'

const SWROptions = {
  // This is the whole purpose of using a library like SWR.
  revalidateIfStale: true,
  // When the component mounts.
  revalidateOnMount: true,
  // Focus as in when users switch between browser tabs. Can be false because
  // its unlikely a user will change their own user settings in multiple browser tabs.
  // (Unless you're a dev testing out this PR)
  revalidateOnFocus: false,
  // If the network goes offline then back online.
  revalidateOnReconnect: true,
  // This would be useful if a user a looking at the same page for
  // awhile and data is updated in the background (like project stats or something)
  // but no need to refresh on an interval here.
  refreshInterval: 0
}

/* Helper function to get info about a user resource. */
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

  return {}
}

export default function useUserData({ login }) {
  const token = usePanoptesAuthToken()
  let key = null

  // Each SWR key is unique. In addition to other checks above for the authenticated user,
  // there's no risk of someone looking at /settings and seeing someone else's user settings by accident
  // because the browser requests are marked by the unique key.
  if (token && login) {
    key = { login, token }
  }

  // The key is passed to the helper function fetchUserData()
  return useSWR(key, fetchUserData, SWROptions)
}
