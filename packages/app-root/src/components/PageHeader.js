'use client'
import ZooHeader from '@zooniverse/react-components/ZooHeader'

import {
  useAdminMode,
  usePanoptesUser,
  useUnreadMessages,
  useUnreadNotifications
} from '../hooks'

export default function PageHeader() {
  const { data: user } = usePanoptesUser()
  const { data: unreadMessages }= useUnreadMessages(user)
  const { data: unreadNotifications }= useUnreadNotifications(user)
  const { adminMode, toggleAdmin } = useAdminMode(user)

  return (
    <ZooHeader
      isAdmin={adminMode}
      unreadMessages={unreadMessages}
      unreadNotifications={unreadNotifications}
      user={user}
    />
  )
}