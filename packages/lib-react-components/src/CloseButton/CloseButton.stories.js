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
    <Grommet theme={zooTheme}>
      <Box
        align='center'
        background={{ light: 'light-1', dark: 'dark-1' }}
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={darkZooTheme}>
      <Box
        align='center'
        background={{ light: 'light-1', dark: 'dark-1' }}
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
        <CloseButton closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)

  .add('Disabled', () => (
    <Grommet theme={zooTheme}>
      <Box
        align='center'
        background={{ light: 'light-1', dark: 'dark-1' }}
        height='small'
        justify='center'
        width='small'
      >
        <CloseButton disabled closeFn={() => { }} />
      </Box>
    </Grommet>
  ), config)
