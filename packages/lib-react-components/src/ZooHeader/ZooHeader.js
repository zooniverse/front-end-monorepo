import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Box } from 'grommet'

import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

import counterpart from 'counterpart'
import en from './locales/en'

import MainNavList from './components/MainNavList'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import SignedOutUserNavigation from './components/SignedOutUserNavigation'
import ZooniverseLogo from './components/ZooniverseLogo'
import { getHost } from './helpers'

counterpart.registerTranslations('en', en)

export const StyledHeader = styled(Box)`
  color: #B2B2B2;
  font-size: 1em;
`

export const StyledLogoAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: #B2B2B2;
  margin-right: 2em;

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.teal};
  }

  > svg {
    vertical-align: text-bottom;
  }
`

const host = getHost()

export default function ZooHeader (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    isNarrow,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    signIn,
    signOut,
    unreadMessages,
    unreadNotifications,
    user
  } = props

  return (
    <StyledHeader
      background='black'
      direction='row'
      fill='horizontal'
      justify='between'
      pad='none'
      responsive={false}
      tag='header'
    >
      <Box
        align='center'
        direction='row'
        flex='grow'
        pad={{ horizontal: 'medium', vertical: 'small' }}
        responsive={false}
        tag='nav'
      >
        <StyledLogoAnchor href='http://www.zooniverse.org'>
          <ZooniverseLogo height='1.25em' width='1.25em' />
        </StyledLogoAnchor>
        <MainNavList
          adminNavLinkLabel={adminNavLinkLabel}
          adminNavLinkURL={adminNavLinkURL}
          isAdmin={isAdmin}
          isNarrow={isNarrow}
          mainHeaderNavListLabels={mainHeaderNavListLabels}
          mainHeaderNavListURLs={mainHeaderNavListURLs}
        />
      </Box>
      <SignedOutUserNavigation
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        isAdmin={isAdmin}
        isNarrow={isNarrow}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
        signIn={signIn}
        user={user}
      />
      <SignedInUserNavigation
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        isNarrow={isNarrow}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
        signOut={signOut}
        user={user}
      />
    </StyledHeader>
  )
}

ZooHeader.defaultProps = {
  adminNavLinkLabel: 'Admin',
  adminNavLinkURL: `${host}/admin`,
  breakpoint: 960,
  isAdmin: false,
  isNarrow: false,
  mainHeaderNavListLabels: [
    counterpart('ZooHeader.mainHeaderNavListLabels.projects'),
    counterpart('ZooHeader.mainHeaderNavListLabels.about'),
    counterpart('ZooHeader.mainHeaderNavListLabels.getInvolved'),
    counterpart('ZooHeader.mainHeaderNavListLabels.talk'),
    counterpart('ZooHeader.mainHeaderNavListLabels.build')
  ],
  mainHeaderNavListURLs: [
    `${host}/projects`,
    `${host}/about`,
    `${host}/get-involved`,
    `${host}/talk`,
    `${host}/lab`
  ],
  unreadMessages: 0,
  unreadNotifications: 0
}

ZooHeader.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string),
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired
}
