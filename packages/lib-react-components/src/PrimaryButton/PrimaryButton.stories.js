import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'

import { backgrounds } from '../../.storybook/lib/'
import readme from './README.md'
import PrimaryButton from './PrimaryButton'

const config = {
  notes: {
    markdown: readme
  }
}

const darkTheme = Object.assign({}, zooTheme, { dark: true })
const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })
const colors = ['blue', 'gold', 'green', 'teal']

storiesOf('PrimaryButton', module)
  .addDecorator(withActions('click button'))
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
      <PrimaryButton
        color={select('Color', colors, colors[1])}
        label={text('Label', 'Click me')}
        onClick={() => { }}
      />
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={darkTheme}>
      <PrimaryButton
        color={select('Color', colors, colors[1])}
        label={text('Label', 'Click me')}
        onClick={() => { }}
      />
    </Grommet>
  ), darkThemeConfig)
