'use client'

import { UserStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

export default function UserStatsPage({ params }) {
  const { adminMode, user } = useContext(PanoptesAuthContext)

  return (
    <UserStats
      adminMode={adminMode}
      authUser={user}
      login={params.login}
    />
  )
}
