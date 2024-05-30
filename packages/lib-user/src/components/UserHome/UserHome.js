import { shape, string } from 'prop-types'

import { Layout } from '@components/shared'
import RecentSubjectsContainer from './components/RecentSubjects/RecentSubjectsContainer.js'

function UserHome({ authUser }) {
  return (
    <Layout>
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
