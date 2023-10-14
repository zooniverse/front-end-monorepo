'use client'
import ZooHeader from '@zooniverse/react-components/ZooHeader'
import { useContext } from 'react'

import {
  useUnreadMessages,
  useUnreadNotifications
} from '../hooks'

import { PanoptesAuthContext } from '../contexts'

export default function PageHeader() {
  const { adminMode, user } = useContext(PanoptesAuthContext)
  const { data: unreadMessages }= useUnreadMessages(user)
  const { data: unreadNotifications }= useUnreadNotifications(user)

  return (
    <ZooHeader
      isAdmin={adminMode}
      unreadMessages={unreadMessages}
      unreadNotifications={unreadNotifications}
      user={user}
    />
  )
}