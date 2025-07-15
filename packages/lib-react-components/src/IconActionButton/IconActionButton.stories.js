import { Box } from 'grommet'
import { CircleInformation, Home } from 'grommet-icons'

import CloseIcon from '../CloseButton/components/CloseIcon'

import IconActionButton from './IconActionButton'

export default {
  title: 'Components / IconActionButton',
  component: IconActionButton,
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
    a11yTitle: 'Metadata',
    icon: <CircleInformation />
  }
}

export const Disabled = {
  args: {
    a11yTitle: 'Metadata',
    disabled: true,
    icon: <CircleInformation />
  }
}

export const Active = {
  args: {
    a11yTitle: 'Metadata',
    active: true,
    icon: <CircleInformation />
  }
}

export const CloseButton = {
  args: {
    a11yTitle: 'Close',
    icon: <CloseIcon />
  }
}

export const Anchor = {
  args: {
    a11yTitle: 'Home',
    href: 'https://www.zooniverse.org',
    icon: <Home />,
    rel: 'noopener noreferrer',
    target: '_blank'
  }
}
