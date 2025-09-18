import { MobXProviderContext } from 'mobx-react'
import { useContext, useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

export default function useAdminMode() {
  const { store } = useContext(MobXProviderContext)
  const [adminState, setAdminState] = useState(false)
  const userIsAdmin = store?.user.isAdmin
  const userIsLoaded = store?.user.isLoaded
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
    let newAdminState = !adminState
    setAdminState(newAdminState)
    if (newAdminState) {
      localStorage?.setItem('adminFlag', true)
    } else {
      localStorage?.removeItem('adminFlag')
    }
  }
  
  return { adminMode, toggleAdmin }
}