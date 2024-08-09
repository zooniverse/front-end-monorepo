import { useContext } from 'react'
import { Box, Grid, ResponsiveContext } from 'grommet'
import { CommunityContainer } from '@zooniverse/content'
import styled from 'styled-components'

import UserHomeLayout from './components/UserHomeLayout/UserHomeLayout.js'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'
import RecentProjectsContainer from './components/RecentProjects/RecentProjectsContainer.js'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'
import MyGroupsContainer from '../MyGroups/MyGroupsContainer.js'
import WelcomeModal from './components/WelcomeModal/WelcomeModal.js'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr;

  @media (width < 80rem) {
    grid-template-columns: 1fr;
  }
`

function UserHome({ authUser, dailyZooPosts = [], zooBlogPosts = [] }) {
  const size = useContext(ResponsiveContext)

  return (
    <UserHomeLayout>
      <WelcomeModal />
      <Box gap='30px'>
        <DashboardContainer authUser={authUser} />
        <StyledGrid gap='30px'>
          <RecentProjectsContainer authUser={authUser} />
          <MyGroupsContainer
            previewLayout
            authUser={authUser}
            login={authUser.login}
          />
        </StyledGrid>
        <RecentSubjectsContainer authUser={authUser} />
        <Box pad={size !== 'small' ? '0' : { horizontal: '30px' }}>
          <CommunityContainer
            dailyZooPosts={dailyZooPosts}
            zooBlogPosts={zooBlogPosts}
          />
        </Box>
      </Box>
    </UserHomeLayout>
  )
}

export default UserHome
