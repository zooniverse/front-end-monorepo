import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'
import { Blank } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import '../../../translations/i18n'

import { faBell as fasBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons/faBell'
import { faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import styled from 'styled-components'

import NarrowMainNavMenu from '../NarrowMainNavMenu'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import { getHost } from '../../helpers'

const StyledBlank = styled(Blank)`
  height: 1em;
  vertical-align: -0.125em;
`
function FontAwesomeIcon({ color, icon, title }) {
  const [width, height, aliases, unicode, path] = icon.icon
  return (
    <StyledBlank
      role='img'
      aria-label={title}
      aria-hidden='false'
      color={color}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        strokeWidth='1'
        fill='currentColor'
        d={path}
      />
    </StyledBlank>
  )
}

export default function SignedInUserNavigation({
  adminNavLinkLabel,
  adminNavLinkURL,
  host = getHost(),
  isAdmin = false,
  isNarrow = false,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
  unreadMessages = 0,
  unreadNotifications = 0,
  signOut,
  user
}) {
  const { t } = useTranslation()

  const notificationLabelString = t('ZooHeader.SignedInUserNavigation.navListLabels.notifications', {
    count: unreadNotifications
  })

  const messagesLabelString = t('ZooHeader.SignedInUserNavigation.navListLabels.messages', {
    count: unreadMessages
  })

  const notificationLabel = (isNarrow)
    ? <FontAwesomeIcon title={notificationLabelString} icon={(unreadNotifications) ? fasBell : farBell} />
    : notificationLabelString

  const messagesLabel = (isNarrow)
    ? <FontAwesomeIcon title={messagesLabelString} icon={(unreadMessages) ? fasEnvelope : farEnvelope} />
    : messagesLabelString

  if (Object.keys(user).length > 0 && signOut) {
    return (
      <Box
        aria-label={t('ZooHeader.SignedInUserNavigation.ariaLabel')}
        as='nav'
        align='center'
        direction='row'
        gap='small'
      >
        <NavListItem
          color={unreadNotifications ? 'accent-1' : '#B2B2B2'}
          label={notificationLabel}
          unread={unreadNotifications}
          url={`${host}/notifications`}
        />
        <NavListItem
          color={unreadMessages ? 'accent-1' : '#B2B2B2'}
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
            isAdmin={user?.admin && isAdmin}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />}
      </Box>
    )
  }

  return null
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
    display_name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired
  }).isRequired
}
