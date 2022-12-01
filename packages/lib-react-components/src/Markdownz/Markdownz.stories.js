import zooTheme from '@zooniverse/grommet-theme';
import { Grid, Grommet, Box, TableRow } from 'grommet';
import styled from 'styled-components';

import Markdownz from './Markdownz';
import readme from './README.md';
import markdownExample from '../../.storybook/lib/example.md';
import markdownInGrid from './markdownGridExample.md';

const TableRowWithBorder = styled(TableRow)`
  border-top: solid thin black;
  border-bottom: solid thin black;
`;

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/Markdownz',
};

export const LightThemeDefault = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Markdownz>{markdownExample}</Markdownz>
    </Box>
  </Grommet>
);

LightThemeDefault.story = {
  name: 'Light theme (default)',
  parameters: config,
};

export const DarkTheme = () => (
  <Grommet theme={zooTheme}>
    <Box background={{ color: '#2D2D2D', dark: true }}>
      <Markdownz>{markdownExample}</Markdownz>
    </Box>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

export const InProjectContext = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Markdownz projectSlug="zooniverse/snapshot-wakanda">{markdownExample}</Markdownz>
    </Box>
  </Grommet>
);

InProjectContext.story = {
  name: 'In project context',
  parameters: config,
};

export const WithCustomComponents = () => (
  <Grommet theme={zooTheme}>
    <Box>
      <Markdownz components={{ tr: TableRowWithBorder }}>{markdownExample}</Markdownz>
    </Box>
  </Grommet>
);

WithCustomComponents.story = {
  name: 'With custom components',
  parameters: config,
};

export const GridExample = () => (
  <Grommet theme={zooTheme}>
    <Grid columns={['small', 'flex']} gap="8%">
      <Box>Sidebar Here</Box>
      <Box>
        <Markdownz>{markdownInGrid}</Markdownz>
      </Box>
    </Grid>
  </Grommet>
);

GridExample.story = {
  name: 'Grid example',
  parameters: config,
};
