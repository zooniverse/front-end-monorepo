'use client'

import { Certificate } from '@zooniverse/user'
import { useContext } from 'react'

import { PanoptesAuthContext } from '../../../../../contexts'
import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer'

function CertificateContainer({
  login
}) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <Certificate
        authUser={user}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default CertificateContainer
