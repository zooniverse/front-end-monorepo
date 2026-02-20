import { AdminCheckbox } from '@zooniverse/react-components'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

function AdminContainer() {
  const { store } = useContext(MobXProviderContext)
  const { isAdmin, adminMode, toggleAdminMode } = store?.user ?? {}

  return isAdmin
    ? <AdminCheckbox onChange={toggleAdminMode} checked={adminMode} />
    : null
}

export default observer(AdminContainer)
