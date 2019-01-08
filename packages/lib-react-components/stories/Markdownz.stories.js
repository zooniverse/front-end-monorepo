import React from 'react'
import { Grommet, Box } from 'grommet'
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
      <Box>
        <Markdownz>{markdownExample}</Markdownz>
      </Box>
    </Grommet>
  )
  .add('Dark theme', () =>
    <Grommet theme={zooTheme}>
      <Box background={{ color: '#2D2D2D', dark: true }}>
        <Markdownz>{markdownExample}</Markdownz>
      </Box>
    </Grommet>
  )
  .add('In project context', () =>
    <Grommet theme={zooTheme}>
      <Box>
        <Markdownz projectSlug='zooniverse/snapshot-wakanda'>{markdownExample}</Markdownz>
      </Box>
    </Grommet>
  )