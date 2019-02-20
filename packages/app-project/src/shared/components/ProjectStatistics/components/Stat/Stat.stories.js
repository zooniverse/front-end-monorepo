import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import Stat from './Stat'

storiesOf('Shared/Components/Project Statistics/Stat', module)
  .add('Default', () => (
    <Grommet theme={zooTheme}>
      <Stat
        label='Volunteers'
        value={122}
      />
    </Grommet>
  ))
  .add('Huge number', () => (
    <Grommet theme={zooTheme}>
      <Stat
        label='Volunteers is a long word'
        value={122000000}
      />
    </Grommet >
  ))
  .add('Zero', () => (
    <Grommet theme={zooTheme}>
      <Stat
        label='Zero'
        value={0}
      />
    </Grommet >
  ))
