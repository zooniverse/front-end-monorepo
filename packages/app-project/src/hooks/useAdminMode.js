import { MobXProviderContext } from 'mobx-react'
import { useContext, useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

export default function useAdminMode() {
  const { store } = useContext(MobXProviderContext)
  const [adminState, setAdminState] = useState(false)
  const adminMode = store?.user.isAdmin && adminState

  useEffect(function onUserChange() {
    const user = store?.user
    if (user?.isAdmin) {
      const adminFlag = !!localStorage?.getItem('adminFlag')
      setAdminState(adminFlag)
    } else {
      localStorage?.removeItem('adminFlag')
    }
  }, [store?.user.isAdmin])

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