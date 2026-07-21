import StatusMessage from './StatusMessage'

export default {
  title: 'Components / Status Message',
  component: StatusMessage
}

export const Default = {
  args: {
    text: 'Change of state!',
    type: 'success',
    width: '',
    pad: '',
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
    pad: {
      control: { type: 'text' },
    },
    margin: {
      control: { type: 'text' },
    },
  }
}
