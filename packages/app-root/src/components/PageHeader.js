'use client'
import ZooHeader from '@zooniverse/react-components/ZooHeader'

import {
  usePanoptesUser,
  useUnreadMessages,
  useUnreadNotifications
} from '../hooks'

export default function PageHeader() {
  const { data: user } = usePanoptesUser()
  const { data: unreadMessages }= useUnreadMessages(user)
  const { data: unreadNotifications }= useUnreadNotifications(user)

  return (
    <ZooHeader
      unreadMessages={unreadMessages}
      unreadNotifications={unreadNotifications}
      user={user}
    />
  )
}