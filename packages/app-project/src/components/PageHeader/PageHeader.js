import { AuthModal, ZooHeader } from '@zooniverse/react-components'
import auth from 'panoptes-client/lib/auth'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { bool } from 'prop-types'
import ThemeModeContext from '@shared/contexts/ThemeModeContext.js'

function useStore() {
  const { store } = useContext(MobXProviderContext)
  const { user: userStore } = store
  return { userStore }
}

function PageHeader({ adminMode }) {
  const [activeIndex, setActiveIndex] = useState(-1)

  const { userStore } = useStore()
  const { admin, display_name, login } = userStore

  const userProp = userStore.isLoggedIn ? { admin, display_name, login } : {}
  const unreadMessages = userStore?.personalization?.notifications?.unreadConversationsIds.length
  const unreadNotifications = userStore?.personalization?.notifications?.unreadNotificationsCount

  const { themeMode, toggleTheme } = useContext(ThemeModeContext)

  /*
    Once AuthModal's form is submitted,
    we still need to update the User store in this app
  */
  function onSignIn(userResource) {
    userStore?.set(userResource)
  }

  function onSignOut() {
    userStore.clear()
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
    <>
      <AuthModal
        activeIndex={activeIndex}
        closeModal={closeAuthModal}
        onActive={setActiveIndex}
        onSignIn={onSignIn}
      />
      <ZooHeader
        adminMode={adminMode}
        onThemeChange={toggleTheme}
        register={openRegisterModal}
        showThemeToggle
        signIn={openSignInModal}
        signOut={onSignOut}
        themeMode={themeMode}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        user={userProp}
      />
    </>
  )
}

export default observer(PageHeader)

PageHeader.propTypes = {
  adminMode: bool
}
