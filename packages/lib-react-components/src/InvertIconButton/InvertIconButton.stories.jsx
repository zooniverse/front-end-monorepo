import { Box } from 'grommet'

import InvertIconButton from './InvertIconButton'

export default {
  title: 'Components / InvertIconButton',
  component: InvertIconButton,
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
    checked: false
  }
}

export const Checked = {
  args: {
    checked: true
  }
}

export const Disabled = {
  args: {
    checked: false,
    disabled: true
  }
}
