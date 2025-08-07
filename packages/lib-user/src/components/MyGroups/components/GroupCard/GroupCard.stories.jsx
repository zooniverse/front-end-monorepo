import { Box } from 'grommet'

import GroupCard from './GroupCard'
import { AdminGroupCard, MemberGroupCard } from './GroupCard.mock'

export default {
  title: 'Components/MyGroups/GroupCard',
  component: GroupCard,
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
      width='624px'
    >
      <Story />
    </Box>
  )
}

export const Admin = {
  args: {
    ...AdminGroupCard
  }
}

export const Member = {
  args: {
    ...MemberGroupCard
  }
}
