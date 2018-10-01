import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import { Mail, MailOption, Notification } from 'grommet-icons'

import counterpart from 'counterpart'
import en from './locales/en'

import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'

counterpart.registerTranslations('en', en)

export default function SignedInUserNavigation({ host, screenWidth, signOut, user }) {
  const notifications = (screenWidth === 'wide') ?
    <NavListItem label={counterpart('SignedInUserNavigation.navListLabels.notifications')} url={`${host}/notifications`} /> :
    <Notification />

  const messages = (screenWidth === 'wide') ?
    <NavListItem label={counterpart('SignedInUserNavigation.navListLabels.messages')} url={`${host}/inbox`} /> :
    <MailOption />

  return (
    <Box
      align="center"
      direction="row"
      tag="nav"
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
  host: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') ? window.location.origin : 'https://www.zooniverse.org'
}

SignedInUserNavigation.propTypes = {
  host: PropTypes.string,
  screenWidth: PropTypes.oneOf('narrow', 'wide').isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}