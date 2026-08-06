import { Box } from 'grommet'
import StatusMessage from './StatusMessage'

export default {
  title: 'Components / Status Message',
  component: StatusMessage,
  decorators: [(Component) => (
    <Box
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      width='600px'
    >
      <Component />
    </Box>
  )]
}

export const Default = {
  args: {
    text: 'Change of state!',
    type: 'success',
    width: '',
    margin: '10px',
  },
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    type: {
      options: ['success', 'error', 'warning', ''],
      control: { type: 'select' },
    },
    width: {
      control: { type: 'text' },
    },
    margin: {
      control: { type: 'text' },
    },
  }
}
