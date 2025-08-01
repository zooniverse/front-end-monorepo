import { Box } from 'grommet'

import { USERS } from '../../../../../test/mocks/panoptes'
import { STATS } from '../../../../../test/mocks/stats.mock'

import TopContributors from './TopContributors'

export default {
  title: 'Components/GroupStats/TopContributors',
  component: TopContributors,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      height='900px'
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    groupId: '1234',
    stats: STATS,
    topContributors: USERS
  }
}
