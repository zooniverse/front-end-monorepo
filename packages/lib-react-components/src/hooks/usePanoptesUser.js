import auth from 'panoptes-client/lib/auth'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import fetchPanoptesUser from '../helpers/fetchPanoptesUser'

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

const defaultKey = {
  user: storedUser,
  endpoint: '/me'
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

  /*
  Experimental support for login/out across tabs, via window
  storage events. Uncomment this to subscribe to changes in the user
  in other tabs.

  useEffect(function subscribeToStorageChanges() {
    function onStorageChange({ key, newValue }) {
      if (key === 'panoptes-user' && newValue) {
        const user = JSON.parse(newValue)
        if (user?.login) {
          console.log('logged in', user)
        } else {
          console.log('logged out', user)
        }
      }
    }
    window.addEventListener('storage', onStorageChange)
    return () => {
      window.removeEventListener('storage', onStorageChange)
    }
  }, [])
  */

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
