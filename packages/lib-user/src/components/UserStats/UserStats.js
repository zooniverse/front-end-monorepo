'use client'

import { Box, Tab, Tabs } from 'grommet'
import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesUser,
  useUserStats
} from '@hooks'

import dateRanges from '../../utils/dateRanges'

import Layout from '../shared/Layout/Layout'
import ContentBox from '../shared/ContentBox/ContentBox'
import ProfileHeader from '../shared/ProfileHeader/ProfileHeader'

function UserStats ({
  authClient,
  login = ''
}) {
  const [activeTab, setActiveTab] = useState(0)
  const { data: user, error, isLoading } = usePanoptesUser(authClient)

  const { data: userStats, error: statsError, isLoading: statsLoading } = useUserStats({ authClient, userID: user?.id })
  function onActive (index) {
    setActiveTab(index)
  }


  return (
    <Layout>
      <ContentBox
        direction='column'
        gap='32px'
        height='512px'
      >
        <ProfileHeader
          avatar={user?.avatar_src}
          classifications={activeTab === 0 ? userStats?.total_count : undefined}
          displayName={user?.display_name}
          hours={activeTab === 1 ? (userStats?.time_spent / 3600) : undefined}
          login={login}
          projects={userStats?.project_contributions?.length}
        />
        <Box
          direction='row'
          gap='32px'
          justify='between'
        >
          <Box
            direction='row'
            gap='32px'
          >
            <Tabs
              activeIndex={activeTab}
              justify='start'
              onActive={onActive}
            >
              <Tab title='CLASSIFICATIONS'>
                <Box>Classification bar chart goes here.</Box>
              </Tab>
              <Tab title='HOURS'>
                <Box>Hours bar chart goes here.</Box>
              </Tab>
            </Tabs>
            {/* TODO: add info button */}
          </Box>
          <Box
            direction='row'
            gap='32px'
          >
          </Box>
        </Box>
      </ContentBox>
    </Layout>
  )
}

UserStats.propTypes = {
  authClient: object,
  login: string
}

export default UserStats
