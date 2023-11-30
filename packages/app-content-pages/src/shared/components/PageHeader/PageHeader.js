import { AuthModal, ZooHeader } from '@zooniverse/react-components'
import auth from 'panoptes-client/lib/auth'
import { useContext, useState } from 'react'
import { useUnreadMessages, useUnreadNotifications } from '@zooniverse/react-components/hooks'
import { PanoptesAuthContext } from '../../contexts'

function PageHeader() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const { user } = useContext(PanoptesAuthContext)
  const { data: unreadMessages } = useUnreadMessages(user)
  const { data: unreadNotifications } = useUnreadNotifications(user)

  function onSignOut() {
    auth.signOut()
  }

  function openRegisterModal() {
    setActiveIndex(1)
  }

  function openSignInModal() {
    setActiveIndex(0)
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
        register={openRegisterModal}
        signIn={openSignInModal}
        signOut={onSignOut}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        user={user}
      />
    </header>
  )
}

export default PageHeader
