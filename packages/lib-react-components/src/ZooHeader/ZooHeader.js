import zooTheme from '@zooniverse/grommet-theme'
import { Anchor, Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getHost } from './helpers'
import { useTranslation } from '../translations/i18n'
import { useHasMounted } from '../hooks'

import MainNavList from './components/MainNavList'
import NarrowMainNavMenu from './components/NarrowMainNavMenu'
import UserNavigation from './components/UserNavigation/UserNavigation.js'
import ZooniverseLogo from '../ZooniverseLogo'

const mobileBreakpoint = '60rem'

const StyledHeader = styled(Box)`
  color: #b2b2b2;
  font-size: 1em;
`

const StyledLogoAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
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

const StyledMainNavList = styled(MainNavList)`
  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

const StyledNarrowMainNav = styled(NarrowMainNavMenu)`
  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

const defaultHandler = () => true

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
  const hasMounted = useHasMounted()
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
      justify='between'
      pad={{ vertical: '20px', horizontal: 'medium' }}
      responsive
      {...props}
    >
      <Box
        as='nav'
        align='center'
        aria-label={t('ZooHeader.ariaLabel')}
        direction='row'
      >
        <StyledLogoAnchor href='http://www.zooniverse.org'>
          <ZooniverseLogo size='1.25em' id='HeaderZooniverseLogo' />
        </StyledLogoAnchor>
        <StyledMainNavList
          adminNavLinkLabel={adminNavLinkLabel}
          adminNavLinkURL={adminNavLinkURL}
          adminMode={user?.admin && adminMode}
          mainHeaderNavListLabels={mainHeaderNavListLabels}
          mainHeaderNavListURLs={mainHeaderNavListURLs}
        />
      </Box>
      <Box
        aria-label={t('ZooHeader.SignedInUserNavigation.ariaLabel')}
        as='nav'
        direction='row'
      >
        {hasMounted && (
          <UserNavigation
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
        <StyledNarrowMainNav
          adminNavLinkLabel={adminNavLinkLabel}
          adminNavLinkURL={adminNavLinkURL}
          adminMode={user?.admin && adminMode}
          mainHeaderNavListLabels={mainHeaderNavListLabels}
          mainHeaderNavListURLs={mainHeaderNavListURLs}
        />
      </Box>
    </StyledHeader>
  )
}

ZooHeader.propTypes = {
  adminMode: PropTypes.bool,
  onThemeChange: PropTypes.func,
  register: PropTypes.func,
  showThemeToggle: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  themeMode: PropTypes.string,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  })
}
