import { withKnobs, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import React from 'react';

import readme from './README.md';
import SpacedText from './SpacedText';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/SpacedText',
  decorators: [withKnobs],
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <SpacedText>{text('Text', 'Zooniverse spaced text')}</SpacedText>
  </Grommet>
);

Default.story = {
  name: 'default',
  parameters: config,
};

export const Bold = () => (
  <Grommet theme={zooTheme}>
    <SpacedText weight="bold">{text('Text', 'Zooniverse spaced text')}</SpacedText>
  </Grommet>
);

Bold.story = {
  name: 'bold',
  parameters: config,
};
