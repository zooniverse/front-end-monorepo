import { useEffect, useState } from 'react'

import usePanoptesUser from './usePanoptesUser.js'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedAdminFlag = !!localStorage?.getItem('adminFlag')

export default function useAdminMode() {
  const user = usePanoptesUser()
  const [adminState, setAdminState] = useState(storedAdminFlag)
  const userIsLoaded = user !== undefined
  const userIsLoggedIn = !!user?.id
  const userIsAdmin = userIsLoggedIn && user?.admin
  const adminMode = userIsLoaded && userIsAdmin && adminState

  useEffect(function onUserChange() {
    if (userIsLoaded) {
      if (userIsAdmin) {
        const adminFlag = !!localStorage?.getItem('adminFlag')
        setAdminState(adminFlag)
      } else {
        localStorage?.removeItem('adminFlag')
      }
    }
  }, [userIsAdmin, userIsLoaded])

  function toggleAdmin() {
    const newAdminState = !adminState
    setAdminState(newAdminState)
    if (newAdminState) {
      localStorage?.setItem('adminFlag', 'true')
    } else {
      localStorage?.removeItem('adminFlag')
    }
  }

  return { adminMode, toggleAdmin }
}
