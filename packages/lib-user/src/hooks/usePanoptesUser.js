import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

import { usePanoptesAuth } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function getUser({ login, authorization }) {
  try {
    const { body } = await panoptes.get('/users', { login }, { authorization })
    const user = body.users[0]
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

async function fetchPanoptesUser({ authClient, authUser, login, authorization }) {
  if (login && login === authUser?.login) {
    if (authUser.avatar_src) {
      return authUser
    }

    const authClientUser = await authClient.checkCurrent()
    if (authClientUser?.avatar_src) {
      return authClientUser
    }

    const panoptesAuthUser = await auth.checkCurrent()
    if (panoptesAuthUser?.avatar_src) {
      return panoptesAuthUser
    }
  }
  
  const panoptesUser = await getUser({ login, authorization })
  return panoptesUser
}

export function usePanoptesUser({ authClient, authUser, authUserId, login }) {
  const authorization = usePanoptesAuth({ authClient, authUserId })
  const key = (login && authUserId) ? { authClient, authUser, login, authorization } : null
  return useSWR(key, fetchPanoptesUser, SWRoptions)
}
