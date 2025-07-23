import { Box } from 'grommet'

import CollectIconButton from './CollectIconButton'

export default {
  title: 'Components / CollectIconButton',
  component: CollectIconButton,
  decorators: [
    (Story) => (
      <Box pad='large'>
        <Story />
      </Box>
    )
  ]
}

export const Default = {
  args: {
    disabled: false
  }
}

export const Disabled = {
  args: {
    disabled: true
  }
}
