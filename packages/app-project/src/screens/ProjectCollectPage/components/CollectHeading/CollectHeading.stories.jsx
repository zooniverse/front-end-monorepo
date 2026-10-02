import { Box } from 'grommet'

import CollectHeading from './CollectHeading'

export default {
  title: 'Project App / Screens / Project Collect / CollectHeading',
  component: CollectHeading,
  decorators: [
    (Story) => (
      <Box pad='medium'>
        <Story />
      </Box>
    )
  ]
}

export const Default = {}
