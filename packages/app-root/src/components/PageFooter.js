'use client'
import { AdminCheckbox, ZooFooter } from '@zooniverse/react-components'
import { useContext } from 'react'

import { PanoptesAuthContext } from '@/contexts'

export default function PageFooter({ locale }) {
  const { adminMode, toggleAdmin, user } = useContext(PanoptesAuthContext)

  return (
    <ZooFooter
      adminContainer={user?.admin ? <AdminCheckbox onChange={toggleAdmin} checked={adminMode} /> : null}
      locale={locale}
    />
  )
}
