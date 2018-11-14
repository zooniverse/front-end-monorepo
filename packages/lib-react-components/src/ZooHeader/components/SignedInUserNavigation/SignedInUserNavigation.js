import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'

import zooTheme from '@zooniverse/grommet-theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell as fasBell, faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBell as farBell, faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'

import counterpart from 'counterpart'
import en from './locales/en'

import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

export default function SignedInUserNavigation ({ breakpoint, host, unreadMessages, unreadNotifications, signOut, user }) {
  const notificationLabelString = (unreadNotifications)
    ? `${counterpart('SignedInUserNavigation.navListLabels.notifications')} (${unreadNotifications})`
    : counterpart('SignedInUserNavigation.navListLabels.notifications')

  const messagesLabelString = (unreadMessages)
    ? `${counterpart('SignedInUserNavigation.navListLabels.messages')} (${unreadMessages})`
    : counterpart('SignedInUserNavigation.navListLabels.messages')
  
  const notificationLabel = (window.innerWidth < breakpoint)
    ? <FontAwesomeIcon icon={(unreadNotifications) ? fasBell : farBell} />
    : notificationLabelString

  const messagesLabel = (window.innerWidth < breakpoint)
    ? <FontAwesomeIcon icon={(unreadMessages) ? fasEnvelope : farEnvelope} />
    : messagesLabelString

  return (
    <Box
      align='center'
      direction='row'
      tag='nav'
    >
      <NavListItem
        color={unreadNotifications ? zooTheme.global.colors.lightTeal : '#B2B2B2'}
        label={notificationLabel}
        unread={unreadNotifications}
        url={`${host}/notifications`}
      />
      <NavListItem
        color={unreadMessages ? zooTheme.global.colors.lightTeal : '#B2B2B2'}
        label={messagesLabel}
        unread={unreadMessages}
        url={`${host}/inbox`}
      />
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
  unreadMessages: 0,
  unreadNotifications: 0
}

SignedInUserNavigation.propTypes = {
  breakpoint: PropTypes.number,
  host: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
