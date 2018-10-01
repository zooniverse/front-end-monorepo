import React from 'react'
import PropTypes from 'prop-types'

import { Anchor, Box, ResponsiveContext } from 'grommet'

import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

import NavListItem from './components/NavListItem'
import SignedInUserNavigation from './components/SignedInUserNavigation'
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

const host = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') ? window.location.origin : 'https://www.zooniverse.org'

const ZooHeader = (props) => {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    signInButton,
    signOut,
    user
  } = props

  return (
    <ResponsiveContext.Consumer>
      {screenWidth => (
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
            pad={{ left: 'medium', right: 'none', vertical: 'small' }}
            responsive={false}
            tag='nav'
          >
            <StyledLogoAnchor href='http://www.zooniverse.org'>
              <ZooniverseLogo height='1.25em' width='1.25em' />
            </StyledLogoAnchor>
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
          {Object.keys(user).length === 0 && signInButton &&
            <Box justify="center" pad={{ right: 'medium', vertical: 'small' }}>
              {signInButton}
            </Box>}
          {Object.keys(user).length > 0 && signOut &&
            <SignedInUserNavigation
              screenWidth={screenWidth}
              signOut={signOut}
              user={user}
            />}
        </StyledHeader>)
      }
    </ResponsiveContext.Consumer>
  )
}

ZooHeader.defaultProps = {
  adminNavLinkLabel: 'Admin',
  adminNavLinkURL: `${host}/admin`,
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
  ]
}

ZooHeader.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  isAdmin: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string),
  signInButton: PropTypes.node.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired
}

export default ZooHeader
