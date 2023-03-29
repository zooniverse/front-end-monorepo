import zooTheme from '@zooniverse/grommet-theme'
import { Grid, Grommet, Box, TableRow } from 'grommet'
import styled from 'styled-components'

import Markdownz from './Markdownz'
import readme from './README.md'
import markdownExample from '../../.storybook/lib/example.md'
import markdownInGrid from './markdownGridExample.md'

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / Markdownz',
  component: Markdownz,
  args: {
    dark: false
  },
  parameters: config
}

export const Default = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box>
      <Markdownz>{markdownExample}</Markdownz>
    </Box>
  </Grommet>
)

export const InProjectContext = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box>
      <Markdownz projectSlug='zooniverse/snapshot-wakanda'>
        {markdownExample}
      </Markdownz>
    </Box>
  </Grommet>
)

export const WithCustomComponents = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box>
      <Markdownz components={{ tr: TableRowWithBorder }}>
        {markdownExample}
      </Markdownz>
    </Box>
  </Grommet>
)

export const GridExample = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Grid columns={['small', 'flex']} gap='8%'>
      <Box>Sidebar Here</Box>
      <Box>
        <Markdownz>{markdownInGrid}</Markdownz>
      </Box>
    </Grid>
  </Grommet>
)
