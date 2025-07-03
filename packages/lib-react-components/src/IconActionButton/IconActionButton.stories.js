import { Box } from 'grommet'
import { CircleInformation } from 'grommet-icons'
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
