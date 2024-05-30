import { Box } from 'grommet'

import { PROJECTS, USERS } from '../../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../../test/mocks/stats.mock'

import ContributorsList from './ContributorsList'

export default {
  title: 'Components/Contributors/ContributorsList',
  component: ContributorsList,
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
  const member = group_member_stats_breakdown.find(stats => stats.user_id.toString() === user.id)

  if (!member) return null

  return {
    ...member,
    ...user
  }
}).filter(Boolean)

export const Default = {
  args: {
    contributors: contributors,
    projects: PROJECTS
  }
}
