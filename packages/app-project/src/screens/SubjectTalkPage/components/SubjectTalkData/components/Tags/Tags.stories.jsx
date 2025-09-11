import { Box } from 'grommet'

import { mockTags } from './Tags.mock.js'
const mockTagsLoggedOut = mockTags.map(tag => ({
  ...tag,
  userVoted: false
}))
import Tags from './Tags'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Tags',
  component: Tags,
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
    tags: mockTags,
    userId: '12345'
  }
}

export const LoggedOut = {
  args: {
    tags: mockTagsLoggedOut
  }
}

export const Loading = {
  args: {
    loading: true,
    tags: []
  }
}

export const Error = {
  args: {
    error: { message: 'Something went wrong' },
    tags: []
  }
}

export const NoTags = {
  args: {
    tags: [],
    userId: '12345'
  }
}
