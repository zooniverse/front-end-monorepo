import { shape, string } from 'prop-types'
import { Box } from 'grommet'

import { Layout } from '@components/shared'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'

function UserHome({ authUser }) {
  return (
    <Layout>
      <DashboardContainer authUser={authUser}/>
      <RecentSubjectsContainer authUser={authUser} />
      <Box height={{ min: '60px'}}/>
    </Layout>
  )
}

export default UserHome

UserHome.propTypes = {
  authUser: shape({
    id: string
  })
}
