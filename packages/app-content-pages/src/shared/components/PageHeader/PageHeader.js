import { AuthModal, ZooHeader } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { useContext, useState } from 'react'
import { useUnreadMessages, useUnreadNotifications } from '@zooniverse/react-components/hooks'
import { PanoptesAuthContext } from '../../contexts'

function PageHeader() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const { user } = useContext(PanoptesAuthContext)
  const { data: unreadMessages }= useUnreadMessages(user)
  const { data: unreadNotifications }= useUnreadNotifications(user)

  const router = useRouter()

  function onSignOut() {
    auth.signOut()
  }

  function getUrlObject() {
    // const isBrowser = typeof window !== 'undefined'
    // if (isBrowser) {
      return new URL(window.location)
    // }
    return ''
  }

  function removeUrlQuery(urlObject, paramToRemove) {
    urlObject.searchParams.delete(paramToRemove)
  }

  function openRegisterModal() {
    const url = new URL(window.location)
    url.searchParams.set('register', true)
    router.push(url, url, { shallow: true })
    setActiveIndex(1)
  }

  function openSignInModal() {
    const url = new URL(window.location)
    url.searchParams.set('login', true)
    router.push(url, url, { shallow: true })
    setActiveIndex(0)
  }

  function closeAuthModal() {
    const url = getUrlObject()
    removeUrlQuery(url, 'login')
    removeUrlQuery(url, 'register')
    router.push(url, url, { shallow: true })
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
