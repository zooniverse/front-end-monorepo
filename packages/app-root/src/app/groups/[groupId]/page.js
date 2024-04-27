'use client'

import { GroupStats } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function GroupPage({ params }) {
  return (
    <GroupStats
      authClient={auth}
      groupId={params.groupId}
      joinToken={params.join_token}
    />
  )
}
