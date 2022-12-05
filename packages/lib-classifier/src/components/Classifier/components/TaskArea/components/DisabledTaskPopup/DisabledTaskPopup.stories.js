import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

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
        options: [ 'light', 'dark' ]
      }
    }
  },
  parameters: {
    docs: {
      inlineStories: false
    }
  }
}

export function Default({ isOpen, nextAvailable, onClose, reset, themeMode }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <DisabledTaskPopup
        isOpen={isOpen}
        nextAvailable={nextAvailable}
        onClose={onClose}
        reset={reset}
      />
    </Grommet>
  )
}