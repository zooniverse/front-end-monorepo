'use client'

import { Contributors } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

function ContributorsContainer({
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
    <Contributors
      adminMode={adminMode}
      authUser={user}
      groupId={groupId}
      joinToken={joinToken}
    />
  )
}

export default ContributorsContainer
