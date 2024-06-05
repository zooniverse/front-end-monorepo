import { shape, string } from 'prop-types'

import { Layout } from '@components/shared'
import DashboardContainer from './components/Dashboard/DashboardContainer.js'

function UserHome({ authUser }) {
  return (
    <Layout>
      <DashboardContainer authUser={authUser}/>
    </Layout>
  )
}

export default UserHome

UserHome.propTypes = {
  authUser: shape({
    id: string
  })
}
