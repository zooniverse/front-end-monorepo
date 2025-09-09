import DisabledTaskPopup from './DisabledTaskPopup'

export default {
  title: 'Tasks / Disabled Task Popup',
  component: DisabledTaskPopup,
  args: {
    isOpen: true,
    themeMode: 'light'
  },
  argTypes: {
    nextAvailable: {
      action: 'Next available subject'
    },
    onClose: {
      action: 'Close popup'
    },
    reset: {
      action: 'Clear the stored subject'
    },
    themeMode: {
      control: {
        type: 'select',
        options: ['light', 'dark']
      }
    }
  },
  parameters: {
    docs: {
      inlineStories: false
    }
  }
}

export function Default({ isOpen, nextAvailable, onClose, reset }) {
  return (
    <DisabledTaskPopup
      isOpen={isOpen}
      nextAvailable={nextAvailable}
      onClose={onClose}
      reset={reset}
    />
  )
}
