import { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import { Anchor } from 'grommet'
import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'

const StyledAnchor = styled(Anchor)`
  line-height: 19px;
`

export default function AuthenticationInvitationContainer({ isVisible }) {
  const { t } = useTranslation('components')
  const [dismissed, setDismissed] = useState(false)
  const { pathname } = window.location
  const signInLink = {
    href: `${pathname}?login=true`,
    text: t('Announcements.AuthenticationInvitation.signIn')
  }
  const registerLink = {
    href: `${pathname}?register=true`,
    text: t('Announcements.AuthenticationInvitation.register')
  }

  // TODO: maybe show project specific message here. Then fallback on generic.
  const announcement = t('Announcements.AuthenticationInvitation.announcement')

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
