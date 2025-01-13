import { Layer, Link, SettingsOption, SubtractCircle } from 'grommet-icons'
import { arrayOf, bool, func, shape, string } from 'prop-types'

import {
  HeaderButton,
  HeaderLink,
  HeaderToast
} from '@components/shared'

const DEFAULT_HANDLER = () => true

function getHeaderItems({
  adminMode,
  authUser,
  group,
  handleGroupMembershipLeave = DEFAULT_HANDLER,
  handleGroupModalActive = DEFAULT_HANDLER,
  membership,
  t
}) {
  const headerItems = {
    PrimaryHeaderItem: null,
    secondaryHeaderItems: []
  }

  const publicGroup = group.stats_visibility.startsWith('public')
  const role = membership?.roles?.[0]
  const shareGroupUrl = new URL(`${window.location.origin}/groups/${group.id}`)
  shareGroupUrl.search = window.location.search
  const shareGroupUrlString = shareGroupUrl.toString()

  if (!role && publicGroup) {
    headerItems.PrimaryHeaderItem = (
      <HeaderToast
        icon={<Layer color='white' size='small' />}
        label={t('GroupStats.headerItems.share')}
        message={t('GroupStats.headerItems.copied')}
        primaryItem={true}
        textToCopy={shareGroupUrlString}
      />
    )
  } else {
    headerItems.PrimaryHeaderItem = (
      <HeaderLink
        href={`/users/${authUser?.login}/groups`}
        label={t('GroupStats.headerItems.all')}
        primaryItem={true}
      />
    )
  }

  if (role === 'group_member') {
    headerItems.secondaryHeaderItems.push(
      <HeaderButton
        key='leave-group-button'
        icon={<SubtractCircle color='white' size='small' />}
        label={t('GroupStats.headerItems.leave')}
        onClick={() => handleGroupMembershipLeave({
          membershipId: membership.id,
        })}
      />
    )
    if (publicGroup) headerItems.secondaryHeaderItems.push(
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Layer color='white' size='small' />}
        label={t('GroupStats.headerItems.share')}
        message={t('GroupStats.headerItems.copied')}
        textToCopy={shareGroupUrlString}
      />
    )
  }

  if (role === 'group_admin' || adminMode) {
    headerItems.secondaryHeaderItems = headerItems.secondaryHeaderItems.concat([
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Link color='white' size='small' />}
        label={t('GroupStats.headerItems.copy')}
        message={t('GroupStats.headerItems.copied')}
        textToCopy={`${window.location.origin}/groups/${group.id}?join_token=${group.join_token}`}
      />,
      <HeaderToast
        key='share-group-toast'
        icon={<Layer color='white' size='small' />}
        label={t('GroupStats.headerItems.share')}
        message={t('GroupStats.headerItems.copied')}
        textToCopy={shareGroupUrlString}
      />,
      <HeaderButton
        key='manage-group-button'
        icon={<SettingsOption color='white' size='small' />}
        label={t('GroupStats.manage')}
        onClick={() => handleGroupModalActive()}
      />
    ])
  }

  return headerItems
}

getHeaderItems.propTypes = {
  adminMode: bool,
  authUser: shape({
    login: string
  }),
  group: shape({
    id: string,
    join_token: string,
    stats_visibility: string
  }),
  handleGroupMembershipLeave: func,
  handleGroupModalActive: func,
  membership: shape({
    id: string,
    roles: arrayOf(string)
  })
}

export default getHeaderItems
