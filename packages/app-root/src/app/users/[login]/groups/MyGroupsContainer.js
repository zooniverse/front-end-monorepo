'use client'

import { MyGroups } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

function MyGroupsContainer({
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
    <MyGroups
      authUser={user}
      login={login}
    />
  )
}

export default MyGroupsContainer
