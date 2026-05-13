import zooTheme from '@zooniverse/grommet-theme'
import { Anchor, Box } from 'grommet'
import { bool, func, number, shape, string } from 'prop-types'
import { useResizeDetector } from 'react-resize-detector'
import styled from 'styled-components'

import { getHost } from './helpers'
import { useTranslation } from '../translations/i18n'
import { useHasMounted } from '../hooks'

import InstituteLogos from './components/InstituteLogos/InstituteLogos'
import MainNavList from './components/MainNavList/MainNavList'
import NarrowMainNavMenu from './components/NarrowMainNavMenu/NarrowMainNavMenu'
import UserNavigation from './components/UserNavigation/UserNavigation'
import ZooniverseLogo from '../ZooniverseLogo/ZooniverseLogo'

const defaultHandler = () => true

// Best guess for when the nav menus should collapse to hamburger style so as not to overlap horiztonally
// This could be refactored to use CSS and rem units. The legacy version of ZooHeader was initially built
// with detecting client side viewport width to define isNarrow as a prop passed to the nav menus.
const narrowNavBreakpoint = 990

// Best guess for max screen width when a user is signed-in, has admin mode enabled, or viewing a locale with longer than average words like German
// while still accounting for rem if someone has changed their browser font size. This resize cannot use CSS container queries because the space in
// between the two navs in ZooHeader doesn't have a defined width and that's incompatible with a CSS container query.
const logosBreakpoint = '80rem'

export const StyledHeader = styled(Box)`
  color: #a6a7a9; // light-5
  font-size: 1em;

  // hide the header when printing, added for the user stats certificate, but applies generally
  @media print {
    display: none;
  }
`

const TopLogosContainer = styled(Box)`
  @media (width >= ${logosBreakpoint}) {
    display: none;
  }
`

const Relative = styled(Box)`
  position: relative;
  padding-block: 20px;

  @media (width < ${narrowNavBreakpoint}px) {
    padding-block: 10px;
  }
`

const Absolute = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;

  @media (width < ${logosBreakpoint}) {
    display: none;
  }
`

export const StyledLogoAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent; // to help align-items center in nav
  color: #a6a7a9; // light-5
  margin-right: 30px;

  &:hover,
  &:focus {
    border-bottom-color: ${zooTheme.global.colors.brand};
  }

  > svg {
    vertical-align: middle;
    width: 1em;
  }
`

export default function ZooHeader({
  adminMode = false,
  onThemeChange = defaultHandler,
  register = defaultHandler,
  showThemeToggle = false,
  signIn = defaultHandler,
  signOut = defaultHandler,
  themeMode = 'light',
  unreadMessages = 0,
  unreadNotifications = 0,
  user = {},
  ...props
}) {
  const { t } = useTranslation()

  // Hide the user nav menus until component is mounted and can detect a signed-in user
  const hasMounted = useHasMounted()

  // Calculate isNarrow
  const { width: headerWidth, ref: headerRef } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 100
  })
  const isNarrow = headerWidth <= narrowNavBreakpoint

  // Form the link URLs
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
    <StyledHeader ref={headerRef} background='black' {...props}>
      <TopLogosContainer direction='row' justify='center' pad={{ top: '10px' }}>
        <InstituteLogos />
      </TopLogosContainer>
      <Relative
        direction='row'
        pad={{
          horizontal: 'medium'
        }}
        justify='between'
      >
        <Absolute fill align='center' direction='row' justify='center'>
          <InstituteLogos />
        </Absolute>
        <Box
          as='nav'
          align='center'
          aria-label={t('ZooHeader.ariaLabel')}
          direction='row'
          style={{ zIndex: 1 }}
        >
          <StyledLogoAnchor href='http://www.zooniverse.org'>
            <ZooniverseLogo size='1.25em' id='HeaderZooniverseLogo' />
          </StyledLogoAnchor>
          <MainNavList
            adminNavLinkLabel={adminNavLinkLabel}
            adminNavLinkURL={adminNavLinkURL}
            adminMode={user?.admin && adminMode}
            isNarrow={isNarrow}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />
        </Box>
        <Box
          aria-label={t('ZooHeader.SignedInUserNavigation.ariaLabel')}
          as='nav'
          direction='row'
          align='center'
          style={{ zIndex: 1 }}
        >
          {hasMounted && (
            <UserNavigation
              isNarrow={isNarrow}
              onThemeChange={onThemeChange}
              register={register}
              showThemeToggle={showThemeToggle}
              signIn={signIn}
              signOut={signOut}
              themeMode={themeMode}
              unreadMessages={unreadMessages}
              unreadNotifications={unreadNotifications}
              user={user}
            />
          )}
          {isNarrow && (
            <NarrowMainNavMenu
              adminNavLinkLabel={adminNavLinkLabel}
              adminNavLinkURL={adminNavLinkURL}
              adminMode={user?.admin && adminMode}
              mainHeaderNavListLabels={mainHeaderNavListLabels}
              mainHeaderNavListURLs={mainHeaderNavListURLs}
            />
          )}
        </Box>
      </Relative>
    </StyledHeader>
  )
}

ZooHeader.propTypes = {
  adminMode: bool,
  onThemeChange: func,
  register: func,
  showThemeToggle: bool,
  signIn: func.isRequired,
  signOut: func.isRequired,
  themeMode: string,
  unreadMessages: number,
  unreadNotifications: number,
  user: shape({
    display_name: string,
    login: string
  })
}
