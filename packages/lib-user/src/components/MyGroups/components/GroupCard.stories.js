import { Box } from 'grommet'

import GroupCard from './GroupCard.js'

export default {
  title: 'Components/MyGroups/GroupCard',
  component: GroupCard,
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
      width='624px'
    >
      <Story />
    </Box>
  )
}

export const Admin = {
  args: {
    displayName: 'Group Name',
    classifications: 1234,
    contributors: 89,
    hours: 567,
    projects: 10,
    role: 'group_admin'
  }
}

export const Member = {
  args: {
    ...Admin.args,
    role: 'member'
  }
}
