'use client'

import { MyGroups } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function MyGroupsPage() {
  return (
    <MyGroups
      authClient={auth}
    />
  )
}
