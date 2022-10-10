import zooTheme from '@zooniverse/grommet-theme'
import { Anchor, Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { getHost } from './helpers'
import { useTranslation } from 'react-i18next'
import '../translations/i18n'

import MainNavList from './components/MainNavList'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import SignedOutUserNavigation from './components/SignedOutUserNavigation'
import ZooniverseLogo from '../ZooniverseLogo'

export const StyledHeader = styled(Box)`
  color: #B2B2B2;
  font-size: 1em;
`

export const StyledLogoAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  color: #B2B2B2;
  margin-right: 2em;

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.brand};
  }

  > svg {
    vertical-align: text-bottom;
    width: 1em;
  }
`

export default function ZooHeader({
  isAdmin,
  isNarrow,
  register,
  signIn,
  signOut,
  unreadMessages,
  unreadNotifications,
  user = {},
  ...props
}) {
  const { t } = useTranslation()

  const host = getHost()
  const adminNavLinkLabel = 'Admin'
  const adminNavLinkURL = `${host}/admin`

  const mainHeaderNavListURLs = [
    `${host}/projects`,
    `${host}/about`,
    `${host}/get-involved`,
    `${host}/talk`,
    `${host}/lab`
  ]

  const mainHeaderNavListLabels = [
    t('ZooHeader.mainHeaderNavListLabels.projects'),
    t('ZooHeader.mainHeaderNavListLabels.about'),
    t('ZooHeader.mainHeaderNavListLabels.getInvolved'),
    t('ZooHeader.mainHeaderNavListLabels.talk'),
    t('ZooHeader.mainHeaderNavListLabels.build')
  ]

  return (
    <StyledHeader
      background='black'
      direction='row'
      fill='horizontal'
      justify='between'
      pad='none'
      responsive={false}
      {...props}
    >
      <Box
        as='nav'
        align='center'
        aria-label={t('ZooHeader.ariaLabel')}
        direction='row'
        pad={{ horizontal: 'medium' }}
        responsive={false}
      >
        <StyledLogoAnchor href='http://www.zooniverse.org'>
          <ZooniverseLogo size='1.25em' id='HeaderZooniverseLogo' />
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
        register={register}
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

// TODO: remove default prop for register once we add that functionality to auth client
ZooHeader.defaultProps = {
  breakpoint: 960,
  isAdmin: false,
  isNarrow: false,
  register: () => {},
  unreadMessages: 0,
  unreadNotifications: 0
}

ZooHeader.propTypes = {
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  register: PropTypes.func,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired
  }).isRequired
}
