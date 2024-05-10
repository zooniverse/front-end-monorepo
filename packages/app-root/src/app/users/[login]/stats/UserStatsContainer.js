'use client'

import { UserStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

function UserStatsContainer({
  login
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  if (typeof window === 'undefined' || isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (!user) {
    return (
      <p>Please log in.</p>
    )
  }

  if (user && login !== user?.login && !adminMode) {
    return (
      <p>Not authorized.</p>
    )
  }

  return (
    <UserStats
      authUser={user}
      login={login}
    />
  )
}

export default UserStatsContainer
