import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { Markdownz } from '../src'
import markdownExample from './lib/example.md'

storiesOf('Markdownz', module)
  // .addParameters({
  //   info: spacedTextDocs
  // })
  .add('Light theme (default)', () =>
    <Grommet theme={zooTheme}>
      <Markdownz>{markdownExample}</Markdownz>
    </Grommet>
  )