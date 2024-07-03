import { shape, string } from 'prop-types'
import { useContext } from 'react'
import { Grid, ResponsiveContext } from 'grommet'

import { Layout } from '@components/shared'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'
import RecentProjectsContainer from './components/RecentProjects/RecentProjectsContainer.js'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'
import MyGroupsContainer from '../MyGroups/MyGroupsContainer.js'
import WelcomeModal from './components/WelcomeModal/WelcomeModal.js'

function UserHome({ authUser }) {
  const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <WelcomeModal />
      <DashboardContainer authUser={authUser} />
      <Grid gap='medium' columns={size === 'large' ? ['1fr 1fr'] : ['1fr']}>
        <RecentProjectsContainer authUser={authUser} />
        <MyGroupsContainer previewLayout authUser={authUser} login={authUser.login} />
      </Grid>
      <RecentSubjectsContainer authUser={authUser} />
    </Layout>
  )
}

export default UserHome

UserHome.propTypes = {
  authUser: shape({
    id: string
  })
}
