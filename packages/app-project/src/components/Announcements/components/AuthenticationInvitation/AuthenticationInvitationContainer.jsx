import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import PlainButton from '@zooniverse/react-components/PlainButton'
import { bool, func } from 'prop-types'

import GenericAnnouncement from '../GenericAnnouncement'

const DEFAULT_HANDLER = () => {}

export default function AuthenticationInvitationContainer({
  isVisible = false,
  setAuthModalActiveIndex = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const [dismissed, setDismissed] = useState(false)

  const announcement = t('Announcements.AuthenticationInvitation.announcement')

  function dismissBanner() {
    setDismissed(true)
  }

  const signInLabel = t('Announcements.AuthenticationInvitation.signIn')
  const registerLabel = t('Announcements.AuthenticationInvitation.register')

  if (isVisible && !dismissed) {
    return (
      <GenericAnnouncement
        announcement={announcement}
        closeFn={dismissBanner}
        color='neutral-5'
        dismissable
      >
        <PlainButton
          color='black'
          text={signInLabel}
          onClick={() => setAuthModalActiveIndex(0)}
        />
        <PlainButton
          color='black'
          text={registerLabel}
          onClick={() => setAuthModalActiveIndex(1)}
        />
      </GenericAnnouncement>
    )
  }

  return null
}

AuthenticationInvitationContainer.propTypes = {
  /** Announcement component is visible when not logged in and after 5 classifications */
  isVisible: bool,
  /** Handles AuthModal in PageHeader */
  setAuthModalActiveIndex: func
}
