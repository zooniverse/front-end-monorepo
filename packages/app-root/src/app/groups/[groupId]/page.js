'use client'

import { GroupStats } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function GroupPage({ params, searchParams }) {
  return (
    <GroupStats
      authClient={auth}
      groupId={params.groupId}
      joinToken={searchParams.join_token}
    />
  )
}
