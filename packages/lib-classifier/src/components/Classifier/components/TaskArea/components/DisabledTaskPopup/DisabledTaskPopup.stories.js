import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import DisabledTaskPopup from './'

export default {
  title: 'Tasks / Disabled Task Popup',
  component: DisabledTaskPopup,
  args: {
    isOpen: true,
    themeMode: 'light'
  },
  argTypes: {
    onClose: {
      action: 'Close popup'
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

export function Default({ isOpen, onClose, themeMode }) {
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
        onClose={onClose}
      />
    </Grommet>
  )
}