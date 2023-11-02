import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedAdminFlag = !!localStorage?.getItem('adminFlag')
const adminBorderImage = 'repeating-linear-gradient(45deg,#000,#000 25px,#ff0 25px,#ff0 50px) 5'

export default function useAdminMode(user) {
  const [adminState, setAdminState] = useState(storedAdminFlag)
  const adminMode = user?.admin && adminState

  useEffect(function onUserChange() {
    const isAdmin = user?.admin
    if (isAdmin) {
      const adminFlag = !!localStorage?.getItem('adminFlag')
      setAdminState(adminFlag)
    } else {
      localStorage?.removeItem('adminFlag')
    }
  }, [user?.admin])

  useEffect(function onAdminChange() {
    if (adminMode) {
      document.body.style.border = '5px solid'
      document.body.style.borderImage = adminBorderImage
    }
    return () => {
      document.body.style.border = ''
      document.body.style.borderImage = ''
    }
  }, [adminMode])

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