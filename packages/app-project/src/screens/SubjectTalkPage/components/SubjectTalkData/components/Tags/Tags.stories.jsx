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
      background={{ dark: 'dark-3', light: 'white' }}
      width='600px'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    tags: mockTags
  }
}

export const LoggedOut = {
  args: {
    disabled: true,
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
    error: { message: 'Detailed error message.' },
    tags: []
  }
}

export const NoTags = {
  args: {
    tags: []
  }
}
