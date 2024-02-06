import auth from 'panoptes-client/lib/auth'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

/*
  This is a variation of the usePanoptesUser hook from the lib-react-components package.
  This hook uses the Panoptes API to get a user object, and stores it in localStorage.
  This hook does not use the Panoptes JWT to get a user object, as the Panoptes JWT user object does not contain the avatar_src property. 
  The avatar_src is needed for various components in lib-user.
  
  *If the Panoptes JWT is refactored to include the avatar_src property, this hook can be replaced with the lib-react-components usePanoptesUser hook.*
*/

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

const localStorage = isBrowser ? window.localStorage : null
const storedUserJSON = localStorage?.getItem('panoptes-user')
let storedUser = storedUserJSON && JSON.parse(storedUserJSON)
/*
  Null users crash the ZooHeader component.
  Set them to undefined for now.
*/
if (storedUser === null) {
  storedUser = undefined
}

/*
  A user that does not have an avatar has an avatar_src of null.
  A user that has an avatar_src of undefined was set from the Panoptes JWT, and might have an avatar, so the user will be requested from the Panoptes API.
*/
if (storedUser?.avatar_src === undefined) {
  storedUser = undefined
}

const defaultKey = {
  user: storedUser,
  endpoint: '/me'
}

async function fetchPanoptesUser({ user: storedUser }) {
  const panoptesUser = await auth.checkCurrent()
  if (panoptesUser) {
    // A lot of user properties are not needed in lib-user, so we only return the ones we need; edit as needed.
    const { admin, avatar_src, display_name, id, login } = panoptesUser
    return { admin, avatar_src, display_name, id, login }
  }

  return {}
}

export default function usePanoptesUser() {
  const [key, setKey] = useState(defaultKey)

  /*
   `useSWR` here will always return the same stale user object.
    See https://github.com/zooniverse/panoptes-javascript-client/issues/207
  */
  const { data, error, isLoading } = useSWR(key, fetchPanoptesUser, SWROptions)
  if (data) {
    storedUser = data
  }

  useEffect(function subscribeToAuthChanges() {
    async function checkUserSession() {
      const user = await fetchPanoptesUser({ user: storedUser })
      if (user?.login) {
        setKey({
          user,
          endpoint: '/me'
        })
      } else {
        setKey({
          user: undefined,
          endpoint: '/me'
        })
      }
    }
    auth.listen('change', checkUserSession)

    return function () {
      auth.stopListening('change', checkUserSession)
    }
  }, [])

  useEffect(function persistUserInStorage() {
    if (data) {
      localStorage?.setItem('panoptes-user', JSON.stringify(data))
    }

    return () => {
      localStorage?.removeItem('panoptes-user')
    }
  }, [data])

  return { data: storedUser, error, isLoading }
}
