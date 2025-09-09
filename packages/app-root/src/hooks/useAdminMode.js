import { useEffect, useState } from 'react'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedAdminFlag = !!localStorage?.getItem('adminFlag')
const adminBorderImage = 'repeating-linear-gradient(45deg,#000,#000 25px,#ff0 25px,#ff0 50px) 5'

export default function useAdminMode() {
  const { data: user, error, isLoading } = usePanoptesUser()
  const [adminState, setAdminState] = useState(storedAdminFlag)
  const userIsLoaded = !isLoading && !error
  const userIsLoggedIn = !!user?.id
  const userIsAdmin = userIsLoggedIn && user?.admin
  const adminMode = userIsLoaded && userIsAdmin && adminState

  useEffect(function onUserChange() {
    if(userIsLoaded) {
      if (userIsAdmin) {
        const adminFlag = !!localStorage?.getItem('adminFlag')
        setAdminState(adminFlag)
      } else {
        localStorage?.removeItem('adminFlag')
      }
    }
  }, [userIsAdmin, userIsLoaded])

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