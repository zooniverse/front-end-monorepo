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

export default function AuthenticationInvitationContainer({ isVisible }) {
  const [dismissed, setDismissed] = React.useState(false)
  const { pathname } = window.location
  const signInLink = {
    href: `${pathname}?login=true`,
    text: counterpart('AuthenticationInvitation.signIn')
  }
  const registerLink = {
    href: `${pathname}?register=true`,
    text: counterpart('AuthenticationInvitation.register')
  }

  // TODO: maybe show project specific message here. Then fallback on generic.
  const announcement = counterpart('AuthenticationInvitation.announcement')

  function dismissBanner() {
    setDismissed(true)
  }

  if (isVisible && !dismissed) {
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