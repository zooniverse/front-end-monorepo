'use client'
import { UserStats } from '@zooniverse/user'

export default function UserPage({ params }) {
  return (
    <UserStats
      login={params.login}
    />
  )
}
