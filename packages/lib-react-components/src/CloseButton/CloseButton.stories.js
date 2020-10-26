import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import CloseButton from './CloseButton'
import readme from './README.md'

const config = {
  notes: {
    markdown: readme
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

storiesOf('CloseButton', module)
  .addDecorator(withActions('click button'))

  .add('Light theme (default)', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box
        align='center'
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={darkZooTheme}
      themeMode='dark'
    >
      <Box
        align='center'
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)

  .add('with teal background', () => (
    <Grommet theme={zooTheme}>
      <Box
        align='center'
        background='brand'
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton color='neutral-6' closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)

  .add('Disabled', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
    >
      <Box
        align='center'
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton disabled closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)
