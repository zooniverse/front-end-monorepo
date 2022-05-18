import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';
import readme from './README.md';

import MetaToolsButton from './';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/MetaToolsButton',
  decorators: [withKnobs],
};

export const Plain = () => (
  <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
    <MetaToolsButton disabled={boolean('disabled', false)} icon={<Add size="small" />} text="Add" />
  </Grommet>
);

Plain.story = {
  name: 'plain',
  parameters: config,
};

export const AsLink = () => (
  <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
    <MetaToolsButton
      disabled={boolean('disabled', false)}
      href={text('href', '/mypage')}
      icon={<Add size="small" />}
      text="Add"
    />
  </Grommet>
);

AsLink.story = {
  name: 'as link',
  parameters: config,
};
