'use client'
import { ZooHeader } from '@zooniverse/react-components'
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
    <header aria-label='Zooniverse site header'>
      <ZooHeader
        isAdmin={adminMode}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        user={user}
      />
    </header>
  )
}