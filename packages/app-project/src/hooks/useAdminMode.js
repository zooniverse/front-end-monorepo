import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

export default function useAdminMode() {
  const { store } = useContext(MobXProviderContext)
  const adminMode = store?.user.adminMode

  function toggleAdmin() {
    store?.user.toggleAdminMode()
  }

  return { adminMode, toggleAdmin }
}
