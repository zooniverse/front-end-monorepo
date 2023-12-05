import PropTypes from 'prop-types'
import { Blank } from 'grommet-icons'
import { useTranslation } from '../../../translations/i18n'

import { faBell as fasBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons/faBell'
import { faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import styled from 'styled-components'

import NavButton from './components/NavButton/NavButton.js'
import NavListItem from '../NavListItem'
import UserMenu from '../UserMenu'
import ThemeModeToggle from '../ThemeModeToggle/ThemeModeToggle.js'
import { getHost } from '../../helpers'

const StyledBlank = styled(Blank)`
  height: 1em;
  vertical-align: -0.125em;
`
function FontAwesomeIcon({ color, icon, title }) {
  const [width, height, aliases, unicode, path] = icon.icon
  return (
    <StyledBlank
      role='img'
      aria-label={title}
      aria-hidden='false'
      color={color}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path strokeWidth='1' fill='currentColor' d={path} />
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
    <FontAwesomeIcon
      title={notificationLabelString}
      icon={unreadNotifications ? fasBell : farBell}
    />
  ) : (
    notificationLabelString
  )

  const messagesLabel = isNarrow ? (
    <FontAwesomeIcon
      title={messagesLabelString}
      icon={unreadMessages ? fasEnvelope : farEnvelope}
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
