import { Box } from 'grommet'

import { MEMBERSHIPS, USERS } from '../../../../../test/mocks/panoptes'

import MembersList from './MembersList'

export default {
  title: 'Components/GroupStats/MembersList',
  component: MembersList,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
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
    authUserId: '54321',
    handleDeleteMembership: (event) => console.log('deleting membership...', event),
    handleUpdateMembership: (event) => console.log('updating membership...', event),
    memberships: MEMBERSHIPS,
    users: USERS
  }
}
