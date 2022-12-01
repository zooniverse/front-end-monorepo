import { linkTo } from '@storybook/addon-links';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import { merge } from 'lodash';

import ZooFooter from './ZooFooter';
import readme from './README.md';
import AdminCheckbox from '../AdminCheckbox';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/ZooFooter',
};

export const LightThemeDefault = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={mergeThemes({ dark: false })}
    themeMode="light"
  >
    <Box fill>
      <ZooFooter />
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
    theme={mergeThemes({ dark: true })}
    themeMode="dark"
  >
    <Box fill>
      <ZooFooter />
    </Box>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

export const LightWithAdmin = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={mergeThemes({ dark: false })}
    themeMode="light"
  >
    <Box fill>
      <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />} />
    </Box>
  </Grommet>
);

LightWithAdmin.story = {
  name: 'Light with admin',
  parameters: config,
};

export const DarkWithAdmin = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={mergeThemes({ dark: true })}
    themeMode="dark"
  >
    <Box fill>
      <ZooFooter adminContainer={<AdminCheckbox onChange={linkTo('ZooFooter/AdminCheckbox')} />} />
    </Box>
  </Grommet>
);

DarkWithAdmin.story = {
  name: 'Dark with admin',
  parameters: config,
};

function mergeThemes(customTheme) {
  return merge({}, zooTheme, customTheme);
}
