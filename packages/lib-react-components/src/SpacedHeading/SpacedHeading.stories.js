import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import React from 'react';

import readme from './README.md';
import SpacedHeading from './SpacedHeading';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/SpacedHeading',
  decorators: [withKnobs],
};

export const Default = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={zooTheme}
    themeMode="light"
  >
    <Box pad="medium">
      <SpacedHeading
        color={text('Color', undefined)}
        level={select('Level', [1, 2, 3, 4, 5, 6], 2)}
        size={select('Size', ['small', 'medium', 'large', 'xlarge'], 'medium')}
        weight={select('Weight', ['normal', 'bold'], 'bold')}
      >
        {text('Text', 'Zooniverse spaced text heading')}
      </SpacedHeading>
    </Box>
  </Grommet>
);

Default.story = {
  name: 'default',
  parameters: config,
};

export const DarkTheme = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={Object.assign({}, zooTheme, { dark: true })}
    themeMode="dark"
  >
    <Box pad="medium">
      <SpacedHeading
        color={text('Color', undefined)}
        level={select('Level', [1, 2, 3, 4, 5, 6], 2)}
        size={select('Size', ['small', 'medium', 'large', 'xlarge'], 'medium')}
        weight={select('Weight', ['normal', 'bold'], 'bold')}
      >
        {text('Text', 'Zooniverse spaced text heading')}
      </SpacedHeading>
    </Box>
  </Grommet>
);

DarkTheme.story = {
  name: 'dark theme',
};
