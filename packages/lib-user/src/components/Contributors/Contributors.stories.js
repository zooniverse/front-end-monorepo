import { Box } from 'grommet'

import { PROJECTS, USERS } from '../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../test/mocks/stats.mock'

import Contributors from './Contributors'

export default {
  title: 'Components/Contributors/Contributors',
  component: Contributors,
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

const contributors = USERS.map(user => {
  const userStats = group_member_stats_breakdown.find(stats => stats.user_id.toString() === user.id)

  if (!userStats) return null

  return {
    id: user.id,
    avatar: user.avatar_src,
    classifications: userStats.count,
    displayName: user.display_name,
    login: user.login,
    ...userStats
  }
}).filter(Boolean)

export const Default = {
  args: {
    contributors: contributors,
    projects: PROJECTS
  }
}
