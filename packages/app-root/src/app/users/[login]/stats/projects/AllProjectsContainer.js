'use client'

import { useContext } from 'react'
import { UserStatsAllProjects } from '@zooniverse/user'
import { useRouter } from 'next/navigation'

import { PanoptesAuthContext } from '@/contexts'
import AuthenticatedUsersPageContainer from '../../../../../components/AuthenticatedUsersPageContainer.js'

function AllProjectsContainer({ login, searchParams }) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)
  const router = useRouter()

  function handleSortParam(value) {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set('sort', value?.value)
    router.push(`${window.location.pathname}?${searchParams}`)
  }

  const sortParam = searchParams?.sort

  return (
    <AuthenticatedUsersPageContainer
      adminMode={adminMode}
      isLoading={isLoading}
      login={login}
      user={user}
    >
      <UserStatsAllProjects
        authUser={user}
        login={login}
        handleSortParam={handleSortParam}
        sortParam={sortParam}
      />
    </AuthenticatedUsersPageContainer>
  )
}

export default AllProjectsContainer
