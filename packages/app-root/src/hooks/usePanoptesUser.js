import auth from 'panoptes-client/lib/auth'
import { useEffect, useState } from 'react'

import { fetchPanoptesUser } from '../helpers'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  auth.checkCurrent()
}

const localStorage = isBrowser ? window.localStorage : null
const storedUserJSON = localStorage?.getItem('panoptes-user')
let user = storedUserJSON && JSON.parse(storedUserJSON)
/*
  Null users crash the ZooHeader component.
  Set them to undefined for now.
*/
if (user === null) {
  user = undefined
}

export default function usePanoptesUser() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function checkUserSession() {
      setLoading(true)
      try {
        const panoptesUser = await fetchPanoptesUser(user)
        if (panoptesUser) {
          localStorage?.setItem('panoptes-user', JSON.stringify(panoptesUser))
          user = panoptesUser
        } else {
          user = undefined
          localStorage?.removeItem('panoptes-user')
        }
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }

    if (isBrowser) {
      checkUserSession()
    }
    auth.listen('change', checkUserSession)

    return function () {
      auth.stopListening('change', checkUserSession)
    }
  }, [])

  return { data: user, error, isLoading: loading }
}
