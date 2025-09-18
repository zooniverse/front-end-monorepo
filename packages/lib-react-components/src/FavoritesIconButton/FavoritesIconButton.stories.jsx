import { Box } from 'grommet'

import FavoritesIconButton from './FavoritesIconButton'

export default {
  title: 'Components / FavoritesIconButton',
  component: FavoritesIconButton,
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

export const Checked = {
  args: {
    checked: true,
    disabled: false
  }
}
