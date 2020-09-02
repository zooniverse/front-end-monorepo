import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Add } from 'grommet-icons'
import React from 'react'

import PlainButton from './PlainButton'
import readme from './README.md'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('PlainButton', module)
  .addDecorator(withActions('click button'))
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Box align='center' justify='center' height='small' width='small'>
        <PlainButton text={text('Text', 'Click me')} />
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark: true })}
      themeMode='dark'
    >
      <Box align='center' justify='center' height='small' width='small'>
        <PlainButton text={text('Text', 'Click me')} />
      </Box>
    </Grommet>
  ), config)

  .add('With icon', () => (
    <Grommet theme={zooTheme}>
      <PlainButton icon={<Add size='1em' />} text={text('Text', 'Click me')} />
    </Grommet>
  ), config)

  .add('Disabled', () => (
    <Grommet theme={zooTheme}>
      <PlainButton disabled text={text('Text', 'Click me')} />
    </Grommet>
  ), config)

  .add('Custom label size', () => (
    <Grommet theme={zooTheme}>
      <PlainButton labelSize={text('label size', 'xsmall')} text={text('Text', 'Click me')} />
    </Grommet>
  ), config)

  .add('Custom color', () => (
    <Grommet theme={zooTheme}>
      <PlainButton
        color={text('Color:', '#FF0000')}
        text={text('Text', 'Click me')}
      />
    </Grommet>
  ), config)
