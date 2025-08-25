import { AdminCheckbox } from '@zooniverse/react-components'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

function useAdminUser() {
  const stores = useContext(MobXProviderContext)
  return stores?.store.user.isAdmin
}

function AdminContainer({ checked, onChange }) {
  const isAdmin = useAdminUser()

  return isAdmin ? <AdminCheckbox onChange={onChange} checked={checked} /> : null
}

export default observer(AdminContainer)
