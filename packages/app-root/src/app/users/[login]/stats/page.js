'use client'
import { UserStats } from '@zooniverse/user'

export default function UserPage() {
  return (
    <UserStats
      authClient={auth}
    />
  )
}
