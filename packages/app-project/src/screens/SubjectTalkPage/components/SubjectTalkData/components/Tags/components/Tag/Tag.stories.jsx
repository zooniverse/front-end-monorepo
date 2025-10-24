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
    tag: {
      id: '1',
      name: 'blue_jay'
    }
  }
}

export const WithVoteCount = {
  args: {
    tag: {
      id: '1',
      name: 'blue_jay',
      vote_count: 3
    }
  }
}

export const UserVoted = {
  args: {
    tag: {
      id: '1',
      name: 'blue_jay',
      userVoted: true,
      vote_count: 5
    }
  }
}

export const Disabled = {
  args: {
    disabled: true,
    tag: {
      id: '1',
      name: 'blue_jay',
      vote_count: 2
    }
  }
}

export const DisabledUserVoted = {
  args: {
    disabled: true,
    tag: {
      id: '1',
      name: 'blue_jay',
      userVoted: true,
      vote_count: 2
    }
  }
}
