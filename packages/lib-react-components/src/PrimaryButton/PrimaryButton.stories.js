import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'
import { withActions } from '@storybook/addon-actions'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'

import { backgrounds } from '../../.storybook/lib/'
import readme from './README.md'
import PrimaryButton from './PrimaryButton'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

const darkTheme = Object.assign({}, zooTheme, { dark: true })
const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })
const colors = ['blue', 'gold', 'green', 'teal']

storiesOf('PrimaryButton', module)
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
      <Box align='center' height='medium' justify='center' width='medium'>
        <PrimaryButton
          color={select('Color', colors, colors[1])}
          disabled={boolean('Disabled', false)}
          label={text('Label', 'Click me')}
          onClick={() => { }}
        />
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={darkTheme}
      themeMode='dark'
    >
      <Box align='center' height='medium' justify='center' width='medium'>
        <PrimaryButton
          color={select('Color', colors, colors[1])}
          disabled={boolean('Disabled', false)}
          label={text('Label', 'Click me')}
          onClick={() => { }}
        />
      </Box>
    </Grommet>
  ), darkThemeConfig)
