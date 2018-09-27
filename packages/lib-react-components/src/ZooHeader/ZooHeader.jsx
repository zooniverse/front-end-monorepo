import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Button, Box, Menu } from 'grommet'

import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

import NavListItem from './components/NavListItem'
import SpacedText from '../SpacedText'
import UserMenu from './components/UserMenu'
import ZooniverseLogo from './components/ZooniverseLogo'

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

const ZooHeader = (props) => {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    authContainer,
    isAdmin,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    signInButton,
    signOutButton,
    user
  } = props

  return (
    <StyledHeader
      background='black'
      direction='row'
      fill='horizontal'
      justify='between'
      pad={{ horizontal: 'medium', vertical: 'none' }}
      responsive={false}
      tag='header'
    >
      <Box
        align='center'
        direction='row'
        responsive={false}
      >
        <StyledLogoAnchor href='http://www.zooniverse.org'>
          <ZooniverseLogo height='1.25em' width='1.25em' />
        </StyledLogoAnchor>
        <Box
          direction='row'
          justify='start'
          pad={{ horizontal: 'none', vertical: 'small' }}
          responsive={false}
          tag='nav'
        >
          {mainHeaderNavListURLs.map((url, i) => (
            <NavListItem
              key={url}
              label={mainHeaderNavListLabels[i]}
              url={url}
            />
          ))}
          {isAdmin &&
            <NavListItem
              label={adminNavLinkLabel}
              url={adminNavLinkURL}
            />
          }
        </Box>
      </Box>
      {Object.keys(user).length === 0 && signInButton &&
        signInButton}
      {Object.keys(user).length > 0 && signOutButton &&
        <UserMenu
          signOutButton={signOutButton}
          user={user}
        />}
      {authContainer &&
        authContainer}
    </StyledHeader>
  )
}

ZooHeader.defaultProps = {
  adminNavLinkLabel: 'Admin',
  adminNavLinkURL: 'http://www.zooniverse.org/admin',
  authContainer: null,
  isAdmin: false,
  mainHeaderNavListLabels: [
    'Projects',
    'About',
    'Get Involved',
    'Talk',
    'Build'
  ],
  mainHeaderNavListURLs: [
    'http://www.zooniverse.org/projects',
    'http://www.zooniverse.org/about',
    'http://www.zooniverse.org/get-involved',
    'http://www.zooniverse.org/talk',
    'http://www.zooniverse.org/lab'
  ]
}

ZooHeader.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  authContainer: PropTypes.node,
  isAdmin: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string),
  signInButton: PropTypes.node.isRequired,
  signOutButton: PropTypes.node.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired
}

export default ZooHeader
