/*
useUserData() is a hook for _fetching_ Panoptes user data.

Input:
- An Object containing:
  - `login` (string): user's login (username).
  - `token` (string): user's Panoptes authentication token.

Output:
- Standard useSWR() output. See example.

Regarding SWR:

- useUserData() uses SWR to ensure the data is fresh by periodically checking
  in with Panoptes.
  - In practice this just mostly means it automatically checks when their
    network reconnects after a disconnect.
  - We also _manually_ trigger a revalidate when we do a mutate() +
    updateUserData() combo to save data to Panoptes.
  - We do NOT automatically revalidate when the window (re-)gains focus, because
    it will reset any local changes/changes not saved to Panoptes caused by
    mutate(). And boy, this is a very annoying experience if you're, say,
    tabbing into another window to check some details.
 */

import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuthToken } from '@zooniverse/react-components/hooks'

// Use default SWR settings, except for...
const SWROptions = {
   // Don't revalidate when window (re-)gains focus, because it will reset any
   // unsaved changes whenever the user checks a different tab/window.
  revalidateOnFocus: false,
}

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