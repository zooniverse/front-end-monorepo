import React from 'react'
import PropTypes from 'prop-types'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'
import counterpart from 'counterpart'

import NarrowMenu from '../NarrowMenu'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem'
import en from './locales/en'
import { getHost } from '../../helpers'

counterpart.registerTranslations('en', en)

// The standard xsmall size in the theme isn't small enough
export const StyledFormDown = styled(FormDown)`
  width: 1em;
`

export default function UserMenu ({ signOut, user }) {
  // Support staging urls...
  const host = getHost()

  const userDisplayName = <NarrowMenuNavListItem color='#B2B2B2' text={user.display_name} />

  const profileLabel = <NarrowMenuNavListItem text={counterpart('UserMenu.userNavListLabels.profile')} />

  const settingsLabel = <NarrowMenuNavListItem text={counterpart('UserMenu.userNavListLabels.settings')} />

  const collectionsLabel = <NarrowMenuNavListItem text={counterpart('UserMenu.userNavListLabels.collections')} />

  const favoritesLabel = <NarrowMenuNavListItem text={counterpart('UserMenu.userNavListLabels.favorites')} />

  const signOutLabel = <NarrowMenuNavListItem text={counterpart('UserMenu.userNavListLabels.signOut')} />

  const userMenuNavListItems = [
    { label: profileLabel, href: `${host}/users/${user.login}` },
    { label: settingsLabel, href: `${host}/settings` },
    { label: collectionsLabel, href: `${host}/collections/${user.login}` },
    { label: favoritesLabel, href: `${host}/favorites/${user.login}` },
    { label: signOutLabel, onClick: signOut }
  ]

  return (
    <NarrowMenu
      icon={<StyledFormDown color='#B2B2B2' />}
      items={userMenuNavListItems}
      label={userDisplayName}
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
