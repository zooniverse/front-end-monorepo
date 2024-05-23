import { Box } from 'grommet'

import { USER, MEMBERSHIPS } from '../../../../../../test/mocks/panoptes'

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
    membershipId: MEMBERSHIPS[1].id,
    role: MEMBERSHIPS[1].roles[0],
    user: USER
  }
}

export const GroupAdmin = {
  args: {
    membershipId: MEMBERSHIPS[0].id,
    role: MEMBERSHIPS[0].roles[0],
    user: USER
  }
}
