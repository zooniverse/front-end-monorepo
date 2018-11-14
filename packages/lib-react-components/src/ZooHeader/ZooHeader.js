import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Box } from 'grommet'

import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

import MainNavList from './components/MainNavList'
import SignInButton from './components/SignInButton'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import ZooniverseLogo from './components/ZooniverseLogo'
import { getHost } from './helpers'

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

const ZooHeader = (props) => {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    breakpoint,
    isAdmin,
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
        pad={{ horizontal: 'medium', vertical: 'small' }}
        responsive={false}
        tag='nav'
      >
        <StyledLogoAnchor href='http://www.zooniverse.org'>
          <ZooniverseLogo height='1.25em' width='1.25em' />
        </StyledLogoAnchor>
        {window.innerWidth >= breakpoint &&
          <MainNavList
            adminNavLinkLabel={adminNavLinkLabel}
            adminNavLinkURL={adminNavLinkURL}
            isAdmin={isAdmin}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />}
      </Box>
      {Object.keys(user).length === 0 && signIn &&
        <Box justify='center' pad={{ right: 'medium', vertical: 'small' }}>
          <SignInButton onClick={signIn} />
        </Box>}
      {Object.keys(user).length > 0 && signOut &&
        <SignedInUserNavigation
          unreadMessages={unreadMessages}
          unreadNotifications={unreadNotifications}
          signOut={signOut}
          user={user}
        />}
      {window.innerWidth < breakpoint &&
        <NarrowMainNavMenu
          adminNavLinkLabel={adminNavLinkLabel}
          adminNavLinkURL={adminNavLinkURL}
          isAdmin={isAdmin}
          mainHeaderNavListLabels={mainHeaderNavListLabels}
          mainHeaderNavListURLs={mainHeaderNavListURLs}
        />}
    </StyledHeader>
  )
}

ZooHeader.defaultProps = {
  adminNavLinkLabel: 'Admin',
  adminNavLinkURL: `${host}/admin`,
  breakpoint: 960,
  isAdmin: false,
  mainHeaderNavListLabels: [
    'Projects',
    'About',
    'Get Involved',
    'Talk',
    'Build'
  ],
  mainHeaderNavListURLs: [
    `${host}/projects`,
    `${host}/about`,
    `${host}/get-involved`,
    `${host}/talk`,
    `${host}/lab`
  ],
  unreadMessages: 0,
  unreadNotifications: 0,
}

ZooHeader.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  breakpoint: PropTypes.number,
  isAdmin: PropTypes.bool,
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

export default ZooHeader
