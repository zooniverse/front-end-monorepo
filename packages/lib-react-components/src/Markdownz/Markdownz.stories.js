import { Grid, Box, TableRow } from 'grommet'
import styled from 'styled-components'

import Markdownz from './Markdownz'
import readme from './README.md'
import markdownExample from '../../.storybook/lib/example.md'
import { examples } from './helpers/storybookExamples'
import markdownInGrid from './markdownGridExample.md'

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`

function MarkdownTableRow({ label, content, ...props }) {
  return (
    <tr>
      <th scope="row">
        {label}
      </th>
      <td>
        <Markdownz {...props}>
        {`\`\`\`  ${content}  \`\`\``}
        </Markdownz>
      </td>
      <td>
        <Markdownz {...props}>
          {content}
        </Markdownz>
      </td>
    </tr>
  )
}

function MarkdownExamplesTable(props) {
  return (
    <table style={{ width: '100%'}}>
      <caption>
        Examples of Zooniverse-flavoured markdown
      </caption>
      <colgroup>
        <col span="1" style={{ width: '20%' }}/>
        <col span="1" style={{ width: '40%' }}/>
        <col span="1" style={{ width: '40%' }}/>
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            Content
          </th>
          <th scope="col">
            Markdown
          </th>
          <th scope="col">
            Rendered
          </th>
        </tr>
      </thead>
      <tbody>
        {examples.map(rowProps => <MarkdownTableRow key={props.label} {...rowProps} {...props} />)}
      </tbody>
    </table>
  )
}

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

export const Default = () => (
  <>
    <MarkdownExamplesTable />
    <Markdownz>
      {markdownExample}
    </Markdownz>
  </>
)

export const InProjectContext = () => (
  <>
    <MarkdownExamplesTable projectSlug='zooniverse/snapshot-wakanda' />
    <Markdownz>
      {markdownExample}
    </Markdownz>
  </>
)

export const WithCustomComponents = () => (
  <>
    <MarkdownExamplesTable components={{ tr: TableRowWithBorder }} />
    <Markdownz>
      {markdownExample}
    </Markdownz>
  </>
)

export const GridExample = () => (
  <Grid columns={['small', 'flex']} gap='8%'>
    <Box>Sidebar Here</Box>
    <Box>
      <Markdownz projectSlug='zooniverse/snapshot-wakanda'>{markdownInGrid}</Markdownz>
    </Box>
  </Grid>
)
