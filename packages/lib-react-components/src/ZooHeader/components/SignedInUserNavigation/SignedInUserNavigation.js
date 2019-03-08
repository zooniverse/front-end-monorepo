import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'

import zooTheme from '@zooniverse/grommet-theme'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell as fasBell, faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBell as farBell, faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons'

import counterpart from 'counterpart'
import en from './locales/en'

import NarrowMainNavMenu from '../NarrowMainNavMenu'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

export default function SignedInUserNavigation (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    host,
    isAdmin,
    isNarrow,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    unreadMessages,
    unreadNotifications,
    signOut,
    user
  } = props

  const notificationLabelString = counterpart('SignedInUserNavigation.navListLabels.notifications', {
    count: unreadNotifications
  })

  const messagesLabelString = counterpart('SignedInUserNavigation.navListLabels.messages', {
    count: unreadMessages
  })

  const notificationLabel = (isNarrow)
    ? <FontAwesomeIcon icon={(unreadNotifications) ? fasBell : farBell} />
    : notificationLabelString

  const messagesLabel = (isNarrow)
    ? <FontAwesomeIcon icon={(unreadMessages) ? fasEnvelope : farEnvelope} />
    : messagesLabelString

  if (Object.keys(user).length > 0 && signOut) {
    return (
      <Box
        align='center'
        direction='row'
        gap='small'
        tag='nav'
      >
        <NavListItem
          color={unreadNotifications ? 'accent-2' : '#B2B2B2'}
          label={notificationLabel}
          unread={unreadNotifications}
          url={`${host}/notifications`}
        />
        <NavListItem
          color={unreadMessages ? 'accent-2' : '#B2B2B2'}
          label={messagesLabel}
          unread={unreadMessages}
          url={`${host}/inbox`}
        />
        <UserMenu
          signOut={signOut}
          user={user}
        />
        {isNarrow &&
          <NarrowMainNavMenu
            adminNavLinkLabel={adminNavLinkLabel}
            adminNavLinkURL={adminNavLinkURL}
            isAdmin={isAdmin}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />}
      </Box>
    )
  }

  return null
}

SignedInUserNavigation.defaultProps = {
  isAdmin: false,
  isNarrow: false,
  host: getHost(),
  unreadMessages: 0,
  unreadNotifications: 0
}

SignedInUserNavigation.propTypes = {
  adminNavLinkLabel: PropTypes.string.isRequired,
  adminNavLinkURL: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  host: PropTypes.string,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  signOut: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
