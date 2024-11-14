import PropTypes from 'prop-types'
import { useTranslation } from '../../../translations/i18n'

import { Blank, Mail, MailOption, Notification } from 'grommet-icons'
import styled from 'styled-components'

import NavButton from './components/NavButton/NavButton.js'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import ThemeModeToggle from '../ThemeModeToggle/ThemeModeToggle.js'
import { getHost } from '../../helpers'

const StyledBlank = styled(Blank)`
  vertical-align: -3px; // to help align-items center in nav
`

const StyledNotificationIcon = styled(Notification)`
  &:first-child {
    & > path {
      fill: ${props => props.theme.global.colors['accent-1']};
      stroke: ${props => props.theme.global.colors['accent-1']};
    }
  }
`

const StyledMailIcon = styled(Mail)`
  &:first-child {
    & > path {
      fill: ${props => props.theme.global.colors['accent-1']};
    }
  }
`

function Icon({ icon, size, title }) {
  return (
    <StyledBlank
      role='img'
      aria-label={title}
      aria-hidden='false'
      size={size}
    >
      {icon}
    </StyledBlank>
  )
}

export default function UserNavigation({
  isNarrow = false,
  onThemeChange,
  register,
  showThemeToggle,
  signIn,
  signOut,
  themeMode,
  unreadMessages = 0,
  unreadNotifications = 0,
  user
}) {
  const { t } = useTranslation()
  const host = getHost()

  const notificationLabelString = t(
    'ZooHeader.SignedInUserNavigation.navListLabels.notifications',
    { count: unreadNotifications }
  )

  const messagesLabelString = t(
    'ZooHeader.SignedInUserNavigation.navListLabels.messages',
    { count: unreadMessages }
  )

  const notificationLabel = isNarrow ? (
    <Icon
      icon={unreadNotifications ? <StyledNotificationIcon /> : <Notification />}
      size='0.8rem'
      title={notificationLabelString}
    />
  ) : (
    notificationLabelString
  )

  const messagesLabel = isNarrow ? (
    <Icon
      icon={unreadMessages ? <StyledMailIcon /> : <MailOption />}
      size={unreadMessages ? '0.9rem' : '0.8rem'}
      title={messagesLabelString}
    />
  ) : (
    messagesLabelString
  )

  return (
    <>
      {Object.keys(user).length === 0 && (
        <>
          {showThemeToggle && (
            <ThemeModeToggle
              themeMode={themeMode}
              onThemeChange={onThemeChange}
            />
          )}
          <NavButton
            label={t('ZooHeader.SignedOutUserNavigation.signIn')}
            onClick={signIn}
            margin={{ right: 'small' }}
          />
          <NavButton
            label={t('ZooHeader.SignedOutUserNavigation.register')}
            onClick={register}
          />
        </>
      )}
      {Object.keys(user).length > 0 && signOut && (
        <>
          <NavListItem
            color={unreadNotifications ? 'accent-1' : '#B2B2B2'}
            label={notificationLabel}
            margin={{ right: 'small' }}
            unread={unreadNotifications}
            url={`${host}/notifications`}
          />
          <NavListItem
            color={unreadMessages ? 'accent-1' : '#B2B2B2'}
            label={messagesLabel}
            margin={{ right: 'small' }}
            unread={unreadMessages}
            url={`${host}/inbox`}
          />
          {showThemeToggle && (
            <ThemeModeToggle
              themeMode={themeMode}
              onThemeChange={onThemeChange}
            />
          )}
          <UserMenu signOut={signOut} user={user} />
        </>
      )}
    </>
  )
}

UserNavigation.propTypes = {
  isNarrow: PropTypes.bool,
  onThemeChange: PropTypes.func,
  register: PropTypes.func.isRequired,
  showThemeToggle: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  themeMode: PropTypes.string,
  unreadMessages: PropTypes.number,
  unreadNotifications: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
