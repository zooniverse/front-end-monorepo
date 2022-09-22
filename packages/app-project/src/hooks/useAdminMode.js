import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null

export default function useAdminMode() {
  const adminFlag = localStorage?.getItem('adminFlag')
  const [adminState, setAdminState] = useState(!!adminFlag)
  const adminMode = adminFlag && adminState
  
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