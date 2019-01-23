import React from 'react'
import styled from 'styled-components'
import { Grommet, Box, TableRow } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { Markdownz } from '../src'
import markdownExample from './lib/example.md'
import markdownzDocs from '../src/Markdownz/README.md'

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`

storiesOf('Markdownz', module)
  .addParameters({
    info: markdownzDocs
  })
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
  .add('With custom components', () =>
    <Grommet theme={zooTheme}>
      <Box>
        <Markdownz components={{ tr: TableRowWithBorder }}>{markdownExample}</Markdownz>
      </Box>
    </Grommet>
  )