import { Box } from 'grommet'

import { getActiveGroupsWithRoles } from '../../helpers/getActiveGroupsWithRoles.js'
import {
  USER,
  MEMBERSHIPS,
  USER_GROUPS
} from '../../../../../test/mocks/panoptes/index.js'

import PreviewLayout from './PreviewLayout'

const MEMBERSHIPS_WITH_GROUPS = {
  linked: {
    user_groups: USER_GROUPS
  },
  memberships: MEMBERSHIPS
}
const groups = getActiveGroupsWithRoles(MEMBERSHIPS_WITH_GROUPS)

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      width={{ max: '625px' }}
    >
      <Story />
    </Box>
  )
}

export default {
  title: 'Components/MyGroups/PreviewLayout',
  component: PreviewLayout,
  decorators: [ComponentDecorator],
  args: {
    authUser: USER,
    groups: groups
  }
}

export const Default = {}
