import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const isBrowser = typeof window !== 'undefined'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

if (isBrowser) {
  auth.checkCurrent()
}

async function getUser({ query }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  
  try {
    const { body } = await panoptes.get('/users', query, { authorization })
    const users = body.users
    return users
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

  if (login) {
    const query = { login }
    const users = await getUser({ query })
    return users?.[0]
  }

  return null
}

export function usePanoptesUser({ authUser, login, requiredUserProperty }) {
  let key = null
  
  if (login) {
    key = { authUser, login }
  }
  
  return useSWR(key, fetchPanoptesUser, SWROptions)
}
