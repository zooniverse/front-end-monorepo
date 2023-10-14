'use client'
import AdminCheckbox from '@zooniverse/react-components/AdminCheckbox'
import ZooFooter from '@zooniverse/react-components/ZooFooter'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../contexts'

export default function PageFooter() {
  const { adminMode, toggleAdmin, user } = useContext(PanoptesAuthContext)

  return (
    <ZooFooter
      adminContainer={user?.admin ? <AdminCheckbox onChange={toggleAdmin} checked={adminMode} /> : null}
    />
  )
}