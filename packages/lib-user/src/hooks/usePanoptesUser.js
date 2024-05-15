import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function getUser({ login }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  try {
    const { body } = await panoptes.get('/users', { login }, { authorization })
    const user = body.users[0]
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

async function fetchPanoptesUser({ authUser, login }) {
  if (login && login === authUser?.login) {
    if (authUser.avatar_src) {
      return authUser
    }

    const authClientUser = await auth.checkCurrent()
    if (authClientUser?.avatar_src) {
      return authClientUser
    }
  }
  
  const panoptesUser = await getUser({ login })
  return panoptesUser
}

export function usePanoptesUser({ authUser, login }) {
  const key = authUser && login ? { authUser, login } : null

  return useSWR(key, fetchPanoptesUser, SWRoptions)
}
