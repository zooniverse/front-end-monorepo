import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import Tabs from './Tabs'
import Tab from '../Tab'
import readme from './README.md'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

storiesOf('Tabs', module)

  .add('Light theme (default)', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Tabs>
        <Tab title='foo'>
          Foo
        </Tab>
        <Tab title='bar'>
          Bar
        </Tab>
      </Tabs>
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
      <Tabs>
        <Tab title='foo'>
          Foo
        </Tab>
        <Tab title='bar'>
          Bar
        </Tab>
      </Tabs>
    </Grommet>
  ), config)
