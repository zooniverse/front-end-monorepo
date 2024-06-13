import { Layer, Link, SettingsOption, SubtractCircle } from 'grommet-icons'
import { arrayOf, bool, shape, string } from 'prop-types'

import {
  deletePanoptesMembership
} from '@utils'

import {
  HeaderButton,
  HeaderLink,
  HeaderToast
} from '@components/shared'

async function handleLeaveGroup({
  login,
  membershipId
}) {
  const userConfirmed = window.confirm('Are you sure you want to leave this group?')
  if (!userConfirmed) return

  const deleteMembershipResponse = await deletePanoptesMembership({ membershipId })
  if (!deleteMembershipResponse.ok) return

  window.location.href = '/'
}

function getHeaderItems({
  adminMode,
  authUser,
  group,
  handleGroupModalActive,
  membership
}) {
  const headerItems = {
    PrimaryHeaderItem: null,
    secondaryHeaderItems: []
  }

  const publicGroup = group.stats_visibility.startsWith('public')
  const role = membership?.roles?.[0]

  if (!role && publicGroup) {
    headerItems.PrimaryHeaderItem = (
      <HeaderToast
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        primaryItem={true}
        textToCopy={`https://fe-root.preview.zooniverse.org/groups/${group.id}`}
      />
    )
  } else {
    headerItems.PrimaryHeaderItem = (
      <HeaderLink
        href={`/users/${authUser?.login}/groups`}
        label='all my groups'
        primaryItem={true}
      />
    )
  }

  if (role === 'group_member') {
    headerItems.secondaryHeaderItems.push(
      <HeaderButton
        key='leave-group-button'
        icon={<SubtractCircle color='white' size='small' />}
        label='Leave Group'
        onClick={() => handleLeaveGroup({ login: authUser?.login, membershipId: membership.id })}
      />
    )
    if (publicGroup) headerItems.secondaryHeaderItems.push(
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        textToCopy={`https://fe-root.preview.zooniverse.org/groups/${group.id}`}
      />
    )
  }

  if (role === 'group_admin' || adminMode) {
    headerItems.secondaryHeaderItems = headerItems.secondaryHeaderItems.concat([
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Link color='white' size='small' />}
        label='Copy Join Link'
        message='Join Link Copied!'
        textToCopy={`https://fe-root.preview.zooniverse.org/groups/${group.id}?join_token=${group.join_token}`}
      />,
      <HeaderToast
        key='share-group-toast'
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        textToCopy={`https://fe-root.preview.zooniverse.org/groups/${group.id}`}
      />,
      <HeaderButton
        key='manage-group-button'
        icon={<SettingsOption color='white' size='small' />}
        label='Manage Group'
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
  membership: shape({
    id: string,
    roles: arrayOf(string)
  })
}

export default getHeaderItems
