import React from 'react'
import PropTypes from 'prop-types'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import '../../../translations/i18n.js'

import NarrowMenu from '../NarrowMenu/index.js'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem/index.js'
import { getHost } from '../../helpers/index.js'

// The standard xsmall size in the theme isn't small enough
export const StyledFormDown = styled(FormDown)`
  width: 1em;
`

export default function UserMenu ({ signOut, user }) {
  const { t } = useTranslation()

  // Support staging urls...
  const host = getHost()

  const userDisplayName = <NarrowMenuNavListItem color='#B2B2B2' text={user.display_name} lang='en' />

  const profileLabel = <NarrowMenuNavListItem text={t('ZooHeader.UserMenu.userNavListLabels.profile')} />

  const settingsLabel = <NarrowMenuNavListItem text={t('ZooHeader.UserMenu.userNavListLabels.settings')} />

  const collectionsLabel = <NarrowMenuNavListItem text={t('ZooHeader.UserMenu.userNavListLabels.collections')} />

  const favoritesLabel = <NarrowMenuNavListItem text={t('ZooHeader.UserMenu.userNavListLabels.favorites')} />

  const signOutLabel = <NarrowMenuNavListItem text={t('ZooHeader.UserMenu.userNavListLabels.signOut')} />

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
    display_name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired
  }).isRequired
}
