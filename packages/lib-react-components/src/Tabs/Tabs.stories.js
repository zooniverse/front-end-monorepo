import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import React from 'react';

import Tabs from './Tabs';
import Tab from '../Tab';
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
  title: 'Components/Tabs',
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
    <Tabs>
      <Tab title="foo">Foo</Tab>
      <Tab title="bar">Bar</Tab>
    </Tabs>
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
    <Tabs>
      <Tab title="foo">Foo</Tab>
      <Tab title="bar">Bar</Tab>
    </Tabs>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};
