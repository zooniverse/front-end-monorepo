import { AdminCheckbox } from '@zooniverse/react-components'
import { useContext } from 'react'

import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'

function AdminContainer() {
  const { user, adminMode, toggleAdmin } = useContext(PanoptesAuthContext)
  const isAdmin = !!user?.admin

  return isAdmin
    ? <AdminCheckbox onChange={toggleAdmin} checked={adminMode} />
    : null
}

export default AdminContainer
