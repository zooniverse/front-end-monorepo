'use client'

import { UserStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

function UserStatsContainer({
  login
}) {
  const { adminMode, user } = useContext(PanoptesAuthContext)

  return (
    <UserStats
      adminMode={adminMode}  
      authUser={user}
      login={login}
    />
  )
}

export default UserStatsContainer
