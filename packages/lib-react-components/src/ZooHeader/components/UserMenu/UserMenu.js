import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'

import UserNavListItem from './components/UserNavListItem'
import en from './locales/en'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

// Grommet v2 components currently can't extend their inner Box styles...
// https://github.com/grommet/grommet/issues/2004
// Manually adjust the inner Box div's padding using styled-components
export const StyledUserMenu = styled(Menu)`
  > div:first-child {
    padding-left: 0;
    padding-right: 24px;
  }
`
// The standard xsmall size in the theme isn't small enough
export const StyledFormDown = styled(FormDown)`
  width: 1em;
`

export default function UserMenu ({ signOut, user }) {
  // Support staging urls...
  const host = getHost()

  const userDisplayName = <UserNavListItem color='#B2B2B2' text={user.display_name} />

  const profileLabel = <UserNavListItem text={counterpart('UserMenu.userNavListLabels.profile')} />

  const settingsLabel = <UserNavListItem text={counterpart('UserMenu.userNavListLabels.settings')} />

  const collectionsLabel = <UserNavListItem text={counterpart('UserMenu.userNavListLabels.collections')} />

  const favoritesLabel = <UserNavListItem text={counterpart('UserMenu.userNavListLabels.favorites')} />

  const signOutLabel = <UserNavListItem text={counterpart('UserMenu.userNavListLabels.signOut')} />

  const userMenuNavListItems = [
    { label: profileLabel, href: `${host}/users/${user.login}` },
    { label: settingsLabel, href: `${host}/settings` },
    { label: collectionsLabel, href: `${host}/collections/${user.login}` },
    { label: favoritesLabel, href: `${host}/favorites/${user.login}` },
    { label: signOutLabel, onClick: signOut }
  ]

  return (
    <StyledUserMenu
      dropBackground={zooTheme.global.colors.teal}
      icon={<StyledFormDown color='#B2B2B2' />}
      items={userMenuNavListItems}
      label={userDisplayName}
      size='small'
    />
  )
};

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
}
