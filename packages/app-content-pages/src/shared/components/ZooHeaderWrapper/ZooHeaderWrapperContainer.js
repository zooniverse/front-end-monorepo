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
  // resetting the alreay seen subjects during the session tracking should move
  // once we refactor the UPP and User resource tracking in the classifier
  // Current implementation in classifier is possibly buggy (see discussion https://github.com/zooniverse/front-end-monorepo/discussions/2362)
  // likely a user id prop will be passed to the classifier and that will be reacted to with an effect hook
  /// which would reset the subject already seen tracking
  // I needed to guarantee that this happened on sign out only so that's why this is here for now
  const seenThisSession = (window) ? window.sessionStorage.getItem("subjectsSeenThisSession") : null

  if (seenThisSession) {
    window.sessionStorage.removeItem("subjectsSeenThisSession")
  }
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
