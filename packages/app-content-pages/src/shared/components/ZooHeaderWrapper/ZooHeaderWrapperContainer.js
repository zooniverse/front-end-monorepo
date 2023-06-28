import { ZooHeader } from '@zooniverse/react-components'
import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { useCallback, useContext } from 'react'

function useStore() {
  const { store } = useContext(MobXProviderContext)
  const { user } = store
  return { user }
}

export function signOut(user) {
  user.clear()
  auth.signOut()
}

function ZooHeaderWrapperContainer(props) {
  const { user } = useStore()
  const router = useRouter()
  const onSignOut = useCallback(() => signOut(user), [user])
  const { admin, display_name, login } = user
  const userProp = user.isLoggedIn ? { admin, display_name, login } : {}
  const unreadMessages = user?.personalization?.notifications?.unreadConversationsIds.length
  const unreadNotifications = user?.personalization?.notifications?.unreadNotificationsCount

  function openRegisterModal() {
    const url = new URL(window.location)
    url.searchParams.set('register', true)
    router.push(url, url, { shallow: true })
  }

  function openSignInModal() {
    const url = new URL(window.location)
    url.searchParams.set('login', true)
    router.push(url, url, { shallow: true })
  }

  return (
    <ZooHeader
      {...props}
      register={openRegisterModal}
      signIn={openSignInModal}
      signOut={onSignOut}
      unreadMessages={unreadMessages}
      unreadNotifications={unreadNotifications}
      user={userProp}
    />
  )
}

export default observer(ZooHeaderWrapperContainer)
