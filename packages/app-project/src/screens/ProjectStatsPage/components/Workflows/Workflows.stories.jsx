import { Box } from 'grommet'

import Workflows from './Workflows'

const mockWorkflows = [
  {
    completeness: 0,
    displayName: 'Look this workflow is brand new!',
    etc: 5098,
    retirement: {
      criteria: '',
      options: {
        count: 15
      }
    },
    retired_set_member_subjects_count: 0,
    subjects_count: 2000
  },
  {
    completeness: 0.5,
    displayName: 'This is a test workflow',
    etc: 50,
    retirement: {
      criteria: '',
      options: {
        count: 15
      }
    },
    retired_set_member_subjects_count: 756,
    subjects_count: 308765
  },
  {
    completeness: 1,
    displayName: 'This is another workflow',
    etc: 0,
    retirement: {
      criteria: '',
      options: {
        count: 5
      }
    },
    retired_set_member_subjects_count: 30,
    subjects_count: 30
  }
]

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
  workflows: mockWorkflows
}
