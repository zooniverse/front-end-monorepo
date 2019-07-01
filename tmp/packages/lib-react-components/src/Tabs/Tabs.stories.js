import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import Tabs from './Tabs'
import Tab from '../Tab'
import readme from './README.md'


const config = {
  notes: {
    markdown: readme
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

storiesOf('Tabs', module)

  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
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
    <Grommet theme={darkZooTheme}>
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
