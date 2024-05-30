'use client'

import RecentSubjects from './components/RecentSubjects/RecentSubjects.js'

function UserHome({ authUser }) {
  return (
    <>
      <RecentSubjects authUser={authUser} />
    </>
  )
}

export default UserHome
