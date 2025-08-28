import { Box } from 'grommet'

import Tag from'./Tag'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Tag',
  component: Tag,
  decorators: [(Story) => (
    <Box
      pad='large'
      background={{ dark: 'dark-3', light: 'white' }}
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    name: 'blue_jay'
  }
}

export const WithVoteCount = {
  args: {
    name: 'blue_jay',
    voteCount: 3
  }
}

export const UserVoted = {
  args: {
    name: 'blue_jay',
    userVoted: true,
    voteCount: 5
  }
}
