'use client'
import { AuthModal, ZooHeader } from '@zooniverse/react-components'
import { useUnreadMessages, useUnreadNotifications } from '@zooniverse/react-components/hooks'
import auth from 'panoptes-client/lib/auth'
import { useContext, useState } from 'react'

import { PanoptesAuthContext, ThemeModeContext } from '../contexts'

export default function PageHeader() {
  const { adminMode, user } = useContext(PanoptesAuthContext)
  const { data: unreadMessages }= useUnreadMessages(user)
  const { data: unreadNotifications }= useUnreadNotifications(user)
  const [activeIndex, setActiveIndex] = useState(-1)

  const { themeMode, toggleTheme } = useContext(ThemeModeContext)

  function openRegisterModal() {
    setActiveIndex(1)
  }

  function openSignInModal() {
    setActiveIndex(0)
  }

  function onSignOut() {
    auth.signOut()
  }

  function closeAuthModal() {
    setActiveIndex(-1)
  }

  return (
    <header aria-label='Zooniverse site header'>
      <AuthModal
        activeIndex={activeIndex}
        closeModal={closeAuthModal}
        onActive={setActiveIndex}
      />
      <ZooHeader
        isAdmin={adminMode}
        onThemeChange={toggleTheme}
        register={openRegisterModal}
        showThemeToggle
        signIn={openSignInModal}
        signOut={onSignOut}
        themeMode={themeMode}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        user={user}
      />
    </header>
  )
}
