import React from 'react'
import { Grommet } from 'grommet'
import { Add } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { PlainButton } from '../src'

storiesOf('PlainButton', module)
  // .addParameters({
  //   info: spacedTextDocs
  // })
  .add('Light theme (default)', () =>
    <Grommet theme={zooTheme}>
      <PlainButton onClick={() => {}} text="Click me" />
    </Grommet>
  )
  .add('Dark theme', () =>
    <Grommet theme={zooTheme}>
      <PlainButton onClick={() => { }} text="Click me" theme='dark' />
    </Grommet>
  )
  .add('With icon', () =>
    <Grommet theme={zooTheme}>
      <PlainButton icon={<Add />} onClick={() => { }} text="Click me" />
    </Grommet>
  )
