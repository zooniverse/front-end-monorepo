import { Box } from 'grommet'

import Workflows from './Workflows'

const mockWorkflowOne = {
  completeness: 0.5,
  displayName: 'This is a test workflow',
  retirement: {
    criteria: '',
    options: {
      count: 5
    }
  },
  subjects_count: 30
}

export default {
  title: 'Project App / Screens / Project Stats',
  component: Workflows,
  decorators: [
    Story => (
      <Box background={{ light: 'white', dark: 'dark-1' }}>
        <Story />
      </Box>
    )
  ]
}

export const Default = {}
Default.args = {
  workflows: mockWorkflowOne
}
