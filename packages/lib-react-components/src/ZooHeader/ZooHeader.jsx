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

export const StyledHeader = styled(Box)`
  color: #b2b2b2;
  font-size: 1em;

  // hide the header when printing, added for the user stats certificate, but applies generally
  @media print {
    display: none;
  }
`

export const StyledLogoAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent; // to help align-items center in nav
  color: #b2b2b2;
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

const defaultHandler = () => true
const navBreakpoint = 960 // legacy best guess for when the nav menus should collapse to hamburger style
const logosBreakpoint = 262 // 40px horizontal padding + 40px total gap + 182px total width of logos

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

  // This resize detector could be refactored to use CSS container queries. The legacy
  // version of ZooHeader was intitially built with detecting client side viewport width
  // to define isNarrow as a props passed to the nav menus.
  const {
    width: headerWidth,
    height: headerHeight,
    ref: headerRef
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 100
  })
  const isNarrow = headerWidth <= navBreakpoint

  // For the institutional logos. This resize cannot use CSS container queries because the container
  // in this case doesn't have a defined width. It adapts to however much space is left in between
  // the nav menus, and that's incompatible with a CSS container query.
  const {
    width: logosContainerWidth,
    height: logosContainerHeight,
    ref: logosContainerRef
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 100
  })
  const showLogosInline = logosContainerWidth > logosBreakpoint

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
      {!showLogosInline && (
        <Box direction='row' justify='center' pad={{ top: '10px' }}>
          <InstituteLogos />
        </Box>
      )}
      <Box direction='row' pad={{ vertical: '10px', horizontal: 'medium' }}>
        <Box
          as='nav'
          align='center'
          aria-label={t('ZooHeader.ariaLabel')}
          direction='row'
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
          flex
          direction='row'
          justify='center'
          ref={logosContainerRef}
        >
          {showLogosInline && <InstituteLogos />}
        </Box>
        <Box
          aria-label={t('ZooHeader.SignedInUserNavigation.ariaLabel')}
          as='nav'
          direction='row'
          align='center'
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
      </Box>
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
