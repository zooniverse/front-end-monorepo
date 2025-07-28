import { Box } from 'grommet'

import ImageIconButton from './ImageIconButton'

export default {
  title: 'Components / ImageIconButton',
  component: ImageIconButton,
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
    href: 'https://panoptes-uploads.zooniverse.org/subject_location/124cfc2d-2d39-4c84-995c-2e3ce9f75317.jpeg'
  }
}

export const Disabled = {
  args: {
    disabled: true
  }
}
