'use client'

import { GroupStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../contexts'

function GroupStatsContainer({
  groupId,
  joinToken
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  if (typeof window === 'undefined' || isLoading) {
    return (
      <p>Loading...</p>
    )
  }
  
  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
      joinToken={joinToken}
    />
  )
}

export default GroupStatsContainer
