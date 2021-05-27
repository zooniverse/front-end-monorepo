import { MobXProviderContext, observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Anchor } from 'grommet'
import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

const StyledAnchor = styled(Anchor)`
  line-height: 19px;
`

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const { isLoggedIn } = stores.store.user
  const { sessionCount } = stores.store.yourStats
  const {
    dismissProjectAnnouncementBanner,
    showAnnouncement
  } = stores.store.ui
  const { baseUrl, isComplete } = stores.store.project
  const afterFive = sessionCount >= 5
  const isVisible = showAnnouncement && !isLoggedIn && !isComplete && afterFive
  return {
    baseUrl,
    dismissBanner: dismissProjectAnnouncementBanner,
    isVisible
  }
}

function AuthenticationInvitationConnector (props) {
  const { baseUrl = '', dismissBanner, isVisible = false } = useStores()
  const signInLink = {
    href: `${baseUrl}?login=true`,
    text: counterpart('AuthenticationInvitation.signIn')
  }
  const registerLink = {
    href: `${baseUrl}?register=true`,
    text: counterpart('AuthenticationInvitation.register')
  }

  // TODO: maybe show project specific message here. Then fallback on generic.
  const announcement = counterpart('AuthenticationInvitation.announcement')
  
  if (isVisible) {
    return (
      <GenericAnnouncement
        announcement={announcement}
        closeFn={dismissBanner}
        color='neutral-5'
        dismissable
      >
        <NavLink color='#000000' link={signInLink} weight='normal' StyledAnchor={StyledAnchor} />
        <NavLink color='#000000' link={registerLink} weight='normal' StyledAnchor={StyledAnchor} />
      </GenericAnnouncement>
    )
  }

  return null
}

export default observer(AuthenticationInvitationConnector)
export { AuthenticationInvitationConnector }