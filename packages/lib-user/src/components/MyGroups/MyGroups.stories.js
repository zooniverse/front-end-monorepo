import { Box } from 'grommet'

import MyGroups from './MyGroups'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

import { MEMBERSHIPS, USER_GROUPS } from '../../../test/mocks/panoptes'

export default {
  title: 'Components/MyGroups',
  component: MyGroups,
  decorators: [ComponentDecorator]
}

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
      fill
      overflow='auto'
      pad='30px'
    >
      <Story />
    </Box>
  )

}

export const Default = {
  args: {
    groups: groups,
    loading: false
  }
}
