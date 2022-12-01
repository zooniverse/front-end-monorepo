import { withActions } from '@storybook/addon-actions';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';

import CloseButton from './CloseButton';
import readme from './README.md';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

const darkZooTheme = { ...zooTheme, dark: true };

export default {
  title: 'Components/CloseButton',
  decorators: [withActions('click button')],
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
    <Box align="center" height="small" justify="center" width="small">
      <CloseButton closeFn={() => {}} />
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
    theme={darkZooTheme}
    themeMode="dark"
  >
    <Box align="center" height="small" justify="center" width="small">
      <CloseButton closeFn={() => {}} />
    </Box>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

export const WithTealBackground = () => (
  <Grommet theme={zooTheme}>
    <Box align="center" background="brand" height="small" justify="center" width="small">
      <CloseButton color="neutral-6" closeFn={() => {}} />
    </Box>
  </Grommet>
);

WithTealBackground.story = {
  name: 'with teal background',
  parameters: config,
};

export const Disabled = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={zooTheme}
  >
    <Box align="center" height="small" justify="center" width="small">
      <CloseButton disabled closeFn={() => {}} />
    </Box>
  </Grommet>
);

Disabled.story = {
  parameters: config,
};
