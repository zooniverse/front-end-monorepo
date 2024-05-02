'use client'

import { MyGroups } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../contexts'

function MyGroupsContainer({
  login
}) {
  const { adminMode, user } = useContext(PanoptesAuthContext)

  return (
    <MyGroups
      adminMode={adminMode}  
      authUser={user}
      login={login}
    />
  )
}

export default MyGroupsContainer
