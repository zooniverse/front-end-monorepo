import { withActions } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';

import PlainButton from './PlainButton';
import readme from './README.md';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/PlainButton',
  decorators: [withActions('click button'), withKnobs],
};

export const LightThemeDefault = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={zooTheme}
    themeMode="light"
  >
    <Box align="center" justify="center" height="small" width="small">
      <PlainButton text={text('Text', 'Click me')} />
    </Box>
  </Grommet>
);

LightThemeDefault.story = {
  name: 'Light theme (default)',
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
    <Box align="center" justify="center" height="small" width="small">
      <PlainButton text={text('Text', 'Click me')} />
    </Box>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

export const WithIcon = () => (
  <Grommet theme={zooTheme}>
    <PlainButton icon={<Add size="1em" />} text={text('Text', 'Click me')} />
  </Grommet>
);

WithIcon.story = {
  name: 'With icon',
  parameters: config,
};

export const Disabled = () => (
  <Grommet theme={zooTheme}>
    <PlainButton href={text('href', '')} disabled text={text('Text', 'Click me')} />
  </Grommet>
);

Disabled.story = {
  parameters: config,
};

export const CustomLabelSize = () => (
  <Grommet theme={zooTheme}>
    <PlainButton labelSize={text('label size', 'xsmall')} text={text('Text', 'Click me')} />
  </Grommet>
);

CustomLabelSize.story = {
  name: 'Custom label size',
  parameters: config,
};

export const CustomColor = () => (
  <Grommet theme={zooTheme}>
    <PlainButton color={text('Color:', '#FF0000')} text={text('Text', 'Click me')} />
  </Grommet>
);

CustomColor.story = {
  name: 'Custom color',
  parameters: config,
};
