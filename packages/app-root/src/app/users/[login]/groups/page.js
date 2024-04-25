'use client'

import { MyGroups } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function MyGroupsPage({ params }) {
  return (
    <MyGroups
      authClient={auth}
      login={params.login}
    />
  )
}
