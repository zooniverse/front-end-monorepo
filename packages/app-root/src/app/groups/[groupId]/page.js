'use client'

import { GroupStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../contexts'

export default function GroupPage({ params }) {
  const { adminMode, user } = useContext(PanoptesAuthContext)
  
  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={params.groupId}
    />
  )
}
