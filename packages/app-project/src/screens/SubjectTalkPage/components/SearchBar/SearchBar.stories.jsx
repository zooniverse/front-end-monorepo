import { Box } from 'grommet'

import SearchBar from './SearchBar'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Search Bar',
  component: SearchBar,
  decorators: [(Story) => (
    <Box
      align='center'
      justify='center'
      background={{ dark: 'dark-3', light: 'white' }}
      pad='small'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    projectSlug: 'test-project'
  }
}
