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

const contributors = group_member_stats_breakdown.map((member) => {
  const user = USERS.find(user => user.id === member.user_id.toString())
  return {
    ...member,
    ...user
  }
})

export const Default = {
  args: {
    contributors: contributors,
    projects: PROJECTS
  }
}
