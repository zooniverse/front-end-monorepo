import { Box } from 'grommet'

import MyGroups from './MyGroups'
import GroupCard from './components/GroupCard/GroupCard'

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
      pad='30px'
    >
      <Story />
    </Box>
  )

}

export const Default = {
  render: () => (
    <MyGroups>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          classifications={Math.floor(Math.random() * 1000)}
          contributors={Math.floor(Math.random() * 10)}
          displayName={group.display_name}
          hours={Math.floor(Math.random() * 50)}
          id={group.id}
          projects={Math.floor(Math.random() * 10)}
          role={group.roles[0]}
        />
      ))}
    </MyGroups>
  )
}
