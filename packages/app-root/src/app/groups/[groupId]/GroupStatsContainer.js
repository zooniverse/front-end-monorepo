'use client'

import { GroupStats } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../contexts'

function GroupStatsContainer({
  groupId
}) {
  const { adminMode, user } = useContext(PanoptesAuthContext)
  
  return (
    <GroupStats
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
    />
  )
}

export default GroupStatsContainer
