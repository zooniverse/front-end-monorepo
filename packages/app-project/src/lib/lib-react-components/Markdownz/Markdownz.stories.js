import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet, Box, TableRow } from 'grommet'
import styled from 'styled-components'
import React from 'react'

import Markdownz from './Markdownz'
import readme from './README.md'
import markdownExample from '../../.storybook/lib/example.md'

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`

const config = {
  notes: {
    markdown: readme
  }
}


storiesOf('Markdownz', module)

  .add('Light theme (default)', () => (
    <Grommet theme={zooTheme}>
      <Box>
        <Markdownz>
          {markdownExample}
        </Markdownz>
      </Box>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet theme={zooTheme}>
      <Box background={{ color: '#2D2D2D', dark: true }}>
        <Markdownz>
          {markdownExample}
        </Markdownz>
      </Box>
    </Grommet>
  ), config)

  .add('In project context', () => (
    <Grommet theme={zooTheme}>
      <Box>
        <Markdownz projectSlug='zooniverse/snapshot-wakanda'>
          {markdownExample}
        </Markdownz>
      </Box>
    </Grommet>
  ), config)

  .add('With custom components', () => (
    <Grommet theme={zooTheme}>
      <Box>
        <Markdownz components={{ tr: TableRowWithBorder }}>
          {markdownExample}
        </Markdownz>
      </Box>
    </Grommet>
  ), config)
