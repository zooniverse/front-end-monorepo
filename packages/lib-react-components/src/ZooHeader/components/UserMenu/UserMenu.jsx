import { func, shape, string } from 'prop-types'
import { Box } from 'grommet'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'
import { useTranslation } from '../../../translations/i18n'

import NarrowMenu from '../NarrowMenu'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem'
import SpacedText from '../../../SpacedText'
import { getHost } from '../../helpers'

// The standard xsmall size in the theme isn't small enough
export const StyledFormDown = styled(FormDown)`
  width: 1em;
`

export default function UserMenu({ signOut, user }) {
  const { t } = useTranslation()

  // Support staging urls...
  const host = getHost()

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
    <NarrowMenu aria-label={user.display_name} items={userMenuNavListItems}>
      <Box align='center' as='span' direction='row'>
        <SpacedText
          color='#b2b2b2'
          lang='en'
          margin={{ right: 'xsmall' }}
          size='xsmall'
          weight='bold'
        >
          {user.display_name}
        </SpacedText>
        <StyledFormDown color='#b2b2b2' />
      </Box>
    </NarrowMenu>
  )
}

UserMenu.propTypes = {
  signOut: func.isRequired,
  user: shape({
    display_name: string.isRequired,
    login: string.isRequired
  }).isRequired
}
