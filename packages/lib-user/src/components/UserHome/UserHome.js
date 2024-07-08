import { useContext } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import { CommunityContainer } from '@zooniverse/content'

import { Layout } from '@components/shared'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'
import RecentProjectsContainer from './components/RecentProjects/RecentProjectsContainer.js'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'
import MyGroupsContainer from '../MyGroups/MyGroupsContainer.js'

function UserHome({ authUser, dailyZooPosts = [], zooBlogPosts = [] }) {
  const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <DashboardContainer authUser={authUser} />
      <Grid gap='medium' columns={size === 'large' ? ['1fr 1fr'] : ['1fr']}>
        <RecentProjectsContainer authUser={authUser} />
        <MyGroupsContainer previewLayout authUser={authUser} login={authUser.login} />
      </Grid>
      <RecentSubjectsContainer authUser={authUser} />
      <Box pad={size !== 'small' ? '0' : { horizontal: '30px' }}>
        <CommunityContainer
          dailyZooPosts={dailyZooPosts}
          zooBlogPosts={zooBlogPosts}
        />
      </Box>
    </Layout>
  )
}

export default UserHome

