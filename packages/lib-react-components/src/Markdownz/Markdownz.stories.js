import { Grid, Box, TableRow } from 'grommet'
import styled from 'styled-components'

import Markdownz from './Markdownz'
import readme from './README.md'
import markdownExample from '../../.storybook/lib/example.md'
import markdownInGrid from './markdownGridExample.md'

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`

export default {
  title: 'Components / Markdownz',
  component: Markdownz,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => <Markdownz>{markdownExample}</Markdownz>

export const InProjectContext = () => (
  <Markdownz projectSlug='zooniverse/snapshot-wakanda'>
    {markdownExample}
  </Markdownz>
)

export const WithCustomComponents = () => (
  <Markdownz components={{ tr: TableRowWithBorder }}>
    {markdownExample}
  </Markdownz>
)

export const GridExample = () => (
  <Grid columns={['small', 'flex']} gap='8%'>
    <Box>Sidebar Here</Box>
    <Box>
      <Markdownz projectSlug='zooniverse/snapshot-wakanda'>{markdownInGrid}</Markdownz>
    </Box>
  </Grid>
)
