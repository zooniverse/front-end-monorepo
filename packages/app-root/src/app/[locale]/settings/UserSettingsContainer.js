'use client'

import { useContext } from 'react'

import { PanoptesAuthContext } from '@/contexts'
import AuthenticatedUsersPageContainer from '@/components/AuthenticatedUsersPageContainer'

function UserSettingsContainer() {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  // AuthenticatedUsersPageContainer was built for pages like /users, to
  // validate if the logged-in user matches the [login] path param (i.e. has
  // access to that user resource). We don't need this validation, so we set
  // `login` to automatically match the logged-in user. 
  const login = user?.login  

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <div>
        PLACEHOLDER
      </div>
    </AuthenticatedUsersPageContainer>
  )
}

export default UserSettingsContainer
