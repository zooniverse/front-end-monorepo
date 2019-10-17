import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import GoldButton from './GoldButton'
import readme from './README.md'
import { backgrounds } from '../../.storybook/lib/'

const config = {
  notes: {
    markdown: readme
  }
}

const darkTheme = Object.assign({}, zooTheme, { dark: true })
const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

storiesOf('GoldButton', module)
  .addDecorator(withActions('click button'))
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
      <GoldButton label={text('Text', 'Click me')} onClick={() => {}} />
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={darkTheme}>
      <GoldButton label={text('Text', 'Click me')} onClick={() => {}} />
    </Grommet>
  ), darkThemeConfig)

  .add('Disabled', () => (
    <Grommet theme={zooTheme}>
      <GoldButton disabled label={text('Text', 'Click me')} onClick={() => {}} />
    </Grommet>
  ), config)

