import { Box } from 'grommet'

import ShareIconButton from './ShareIconButton'

export default {
  title: 'Components / ShareIconButton',
  component: ShareIconButton,
  decorators: [
    (Story) => (
      <Box pad='large'>
        <Story />
      </Box>
    )
  ]
}

export const Default = { args: {} }
