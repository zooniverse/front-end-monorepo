import { Box } from 'grommet'

import Discussions from './Discussions'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Discussions',
  component: Discussions,
  decorators: [(Story) => (
    <Box
      background={{ dark: 'dark-3', light: 'white' }}
      width='600px'
    >
      <Story />
    </Box>
  )]
}

export const Error = {
  args: {
    error: { message: 'Detailed error message.' }
  }
}

export const Loading = {
  args: {
    loading: true
  }
}

export const NoDiscussions = {
  args: {
    discussions: []
  }
}
