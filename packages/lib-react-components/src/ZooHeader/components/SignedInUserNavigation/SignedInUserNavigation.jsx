import counterpart from 'counterpart'
import { Box } from 'grommet'
import { MailOption, Notification } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

export default function SignedInUserNavigation ({ host, screenWidth, signOut, user }) {
  const notifications = (screenWidth === 'wide')
    ? <NavListItem label={counterpart('SignedInUserNavigation.navListLabels.notifications')} url={`${host}/notifications`} />
    : <Notification />

  const messages = (screenWidth === 'wide')
    ? <NavListItem label={counterpart('SignedInUserNavigation.navListLabels.messages')} url={`${host}/inbox`} />
    : <MailOption />

  return (
    <Box
      align='center'
      direction='row'
      tag='nav'
    >
      {notifications}
      {messages}
      <UserMenu
        signOut={signOut}
        user={user}
      />
    </Box>
  )
}

SignedInUserNavigation.defaultProps = {
  host: getHost()
}

SignedInUserNavigation.propTypes = {
  host: PropTypes.string,
  screenWidth: PropTypes.oneOf(['narrow', 'wide']).isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
