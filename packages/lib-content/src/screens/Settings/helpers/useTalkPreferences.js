/*
useTalkPreferences() is a hook for _fetching_ a user's Talk Preferences.

Input:
- An Object containing:
  - `login` (string): user's login (username).

Output:
- Standard useSWR() output. See example in README.
- `swrOutput.data` will be an array of Talk Subscription Preference resources.
  - The array will be a SUBSET of all available preferences, in this specific
    order of categories:  participating_discussions, mentions, messages,
    followed_discussions, group_mentions, started_discussions
  - Hidden categories include: system, 

Dev Notes:
- Weirdly, this function doesn't _actually_ need to ask for the user login other
  than our pattern for creating a unique SWR key. This is because Talk's
  /subscription_preferences doesn't require a login or user ID filter; it just
  asks for the auth token to return a user's subscription preferences. 🤷
- Talk Preferences (actually, "subscription preferences" from Talk,
  i.e. talk.zooniverse.org/subscription_preferences) come in the following
  categories: participating_discussions, mentions, messages, system,
  followed_discussions, moderation_reports, group_mentions, started_discussions.
- We only allow users to edit some categories.
- The order of categories is determined by Panoptes; we could sort the output
  array if we want it to be more predictable.
 */

import { talkAPI } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { usePanoptesAuthToken } from '@zooniverse/react-components/hooks'

const ALLOWED_CATEGORIES = [
  'participating_discussions',
  'mentions',
  'messages',
  'followed_discussions',
  'group_mentions',
  'started_discussions'
]

// Use default SWR settings, except for...
const SWROptions = {
   // Don't revalidate when window (re-)gains focus, because it will reset any
   // unsaved changes whenever the user checks a different tab/window.
  revalidateOnFocus: false,
}

async function fetchTalkSubscriptionPreferences({ token }) {
  const authorization = `Bearer ${token}`
  const query = {}

  try {
    const { body } = await talkAPI.get('/subscription_preferences', query, { authorization })
    const preferences = body.subscription_preferences
    const filteredPreferences = preferences.filter?.(pref => ALLOWED_CATEGORIES.includes(pref.category)) || []
    return filteredPreferences
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function useTalkPreferences({ login }) {
  // Use login and authentication token as SWR key.
  // ⚠️ WARNING: Panoptes Auth Token can change if user is logged in long
  // enough to trigger an automatic refresh. This MAY lead to shenanigans.
  const token = usePanoptesAuthToken()
  const key = (token && login)
    ? { login, token }
    : null
  
  return useSWR(key, fetchTalkSubscriptionPreferences, SWROptions)
}
