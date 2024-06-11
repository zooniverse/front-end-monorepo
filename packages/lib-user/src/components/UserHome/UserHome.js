import { shape, string } from 'prop-types'
import { useContext } from 'react'
import { Grid, ResponsiveContext } from 'grommet'

import { ContentBox, Layout } from '@components/shared'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'
import MyGroupsContainer from '../MyGroups/MyGroupsContainer.js'

function UserHome({ authUser }) {
  const size = useContext(ResponsiveContext)

  return (
    <Layout>
      <DashboardContainer authUser={authUser} />
      <Grid gap='medium' columns={size !== 'small' ? ['1fr 1fr'] : ['1fr']}>
        <ContentBox />
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
