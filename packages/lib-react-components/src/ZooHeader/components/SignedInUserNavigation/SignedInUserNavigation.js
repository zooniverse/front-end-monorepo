import counterpart from 'counterpart'
import { Box } from 'grommet'
import { MailOption, Notification } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell as fasBell, faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBell as farBell, faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'
import en from './locales/en'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

export default function SignedInUserNavigation ({ breakpoint, host, messages, notifications, signOut, user }) {
  const notificationLabel = (window.innerWidth < breakpoint)
    ? <FontAwesomeIcon icon={(notifications) ? fasBell : farBell} />
    : counterpart('SignedInUserNavigation.navListLabels.notifications')

  const messagesLabel = (window.innerWidth < breakpoint)
    ? <FontAwesomeIcon icon={(messages) ? fasEnvelope : farEnvelope} />
    : counterpart('SignedInUserNavigation.navListLabels.messages')

  return (
    <Box
      align='center'
      direction='row'
      tag='nav'
    >
      <NavListItem label={notificationLabel} url={`${host}/notifications`} />
      <NavListItem label={messagesLabel} url={`${host}/inbox`} />
      <UserMenu
        signOut={signOut}
        user={user}
      />
    </Box>
  )
}

SignedInUserNavigation.defaultProps = {
  breakpoint: 960,
  host: getHost(),
  messages: false,
  notifications: false
}

SignedInUserNavigation.propTypes = {
  breakpoint: PropTypes.number,
  host: PropTypes.string,
  messages: PropTypes.bool,
  notifications: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
