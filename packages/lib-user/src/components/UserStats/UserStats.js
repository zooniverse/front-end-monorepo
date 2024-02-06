'use client'

import { string } from 'prop-types'

import {
  usePanoptesUser,
  useUserStats
} from '@hooks'

import Layout from '../shared/Layout/Layout'
import ContentBox from '../shared/ContentBox/ContentBox'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'

function UserStats ({
  login = ''
}) {
  const { data: user, error, isLoading } = usePanoptesUser()
  
  const { data: userStats, error: statsError, isLoading: statsLoading } = useUserStats({ userID: user?.id })

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
        />
      </ContentBox>
    </Layout>
  )
}

UserStats.propTypes = {
  login: string
}

export default UserStats
