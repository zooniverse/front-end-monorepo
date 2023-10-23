import auth from 'panoptes-client/lib/auth'
import { useEffect } from 'react'
import useSWR from 'swr'

import { fetchPanoptesUser } from '../helpers'

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

export default function usePanoptesUser() {
  const key = {
    user: storedUser,
    endpoint: '/me'
  }

  /*
   `useSWR` here will always return the same stale user object.
    See https://github.com/zooniverse/panoptes-javascript-client/issues/207
  */
  const { data, error, isLoading } = useSWR(key, fetchPanoptesUser, SWROptions)
  if (data) {
    storedUser = data
  }

  useEffect(function subscribeToAuthChanges() {
    auth.listen('change', auth.checkCurrent)

    return function () {
      auth.stopListening('change', auth.checkCurrent)
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
