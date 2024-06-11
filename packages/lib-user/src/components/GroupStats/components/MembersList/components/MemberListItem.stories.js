import { Box } from 'grommet'

import { GROUP_ADMIN_USER, GROUP_MEMBER_USER, MEMBERSHIPS } from '../../../../../../test/mocks/panoptes'

import MemberListItem from './MemberListItem'

export default {
  title: 'Components/GroupStats/MemberListItem',
  component: MemberListItem,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    membershipId: MEMBERSHIPS[3].id,
    role: MEMBERSHIPS[3].roles[0],
    user: GROUP_MEMBER_USER
  }
}

export const GroupAdmin = {
  args: {
    membershipId: MEMBERSHIPS[2].id,
    role: MEMBERSHIPS[2].roles[0],
    user: GROUP_ADMIN_USER
  }
}
