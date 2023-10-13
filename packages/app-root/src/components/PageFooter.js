'use client'
import AdminCheckbox from '@zooniverse/react-components/AdminCheckbox'
import ZooFooter from '@zooniverse/react-components/ZooFooter'

import { useAdminMode, usePanoptesUser } from '../hooks'

export default function PageFooter() {
  const { data: user, isLoading } = usePanoptesUser()
  const { adminMode, toggleAdmin } = useAdminMode(user)

  return (
    <ZooFooter
      adminContainer={(!isLoading && user?.admin) ? <AdminCheckbox onChange={toggleAdmin} checked={adminMode} /> : null}
    />
  )
}