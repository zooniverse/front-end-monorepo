'use client'

import { MyGroups } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

export default function MyGroupsPage({ params }) {
  const { adminMode, user } = useContext(PanoptesAuthContext)

  return (
    <MyGroups
      adminMode={adminMode}  
      authUser={user}
      login={params.login}
    />
  )
}
