'use client'
import { UserStats } from '@zooniverse/user'
import auth from 'panoptes-client/lib/auth'

export default function UserPage({ params }) {
  return (
    <UserStats
      authClient={auth}
    />
  )
}
