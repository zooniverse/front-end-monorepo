'use client'

import { object, string } from 'prop-types'

import {
  usePanoptesUser,
  useUserStats
} from '@hooks'

import Layout from '../shared/Layout/Layout'
import ContentBox from '../shared/ContentBox/ContentBox'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'

function UserStats ({
  authClient,
  login = ''
}) {
  const { data: user, error, isLoading } = usePanoptesUser(authClient)

  const { data: userStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id })

  return (
    <Layout>
      <ContentBox
        direction='column'
        gap='32px'
        height='400px'
      >
        <ProfileHeader
          avatar={user?.avatar_src}
          classifications={userStats?.total_count}
          displayName={user?.display_name}
          login={login}
          projects={userStats?.project_contributions?.length}
        />
      </ContentBox>
    </Layout>
  )
}

UserStats.propTypes = {
  authClient: object,
  login: string
}

export default UserStats
