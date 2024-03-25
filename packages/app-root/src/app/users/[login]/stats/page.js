'use client'

import { UserStats } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function UserStatsPage({ params }) {
  return (
    <UserStats
      authClient={auth}
      login={params.login}
    />
  )
}
