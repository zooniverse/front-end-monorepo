import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Add } from 'grommet-icons'
import React from 'react'
import readme from './README.md'

import MetaToolsButton from './'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

storiesOf('MetaToolsButton', module)
  .addDecorator(withKnobs)
  .add('plain', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <MetaToolsButton
        disabled={boolean('disabled', false)}
        icon={<Add size='small' />}
        text='Add'
      />
    </Grommet>
  ), config)
  .add('as link', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <MetaToolsButton
        disabled={boolean('disabled', false)}
        href={text('href', '/mypage')}
        icon={<Add size='small' />}
        text='Add'
      />
    </Grommet>
  ), config)
