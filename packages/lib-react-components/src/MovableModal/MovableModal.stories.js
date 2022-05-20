import { withKnobs, object, select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet, Text, TextArea } from 'grommet';
import React from 'react';

import MovableModal from './MovableModal';
import PrimaryButton from '../PrimaryButton';
import readme from './README.md';

const EXAMPLE_STRING =
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.';

const config = {
  docs: {
    description: {
      component: readme,
    },
    inlineStories: false,
  },
};

const layerPositions = [
  'bottom',
  'bottom-left',
  'bottom-right',
  'center',
  'end',
  'hidden',
  'left',
  'right',
  'start',
  'top',
  'top-left',
  'top-right',
];

export default {
  title: 'Components/MovableModal',
  decorators: [withKnobs],
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
    <MovableModal
      active={boolean('Active', true)}
      animate={boolean('Animate layer', false)}
      headingBackground={text('Heading background color', 'brand')}
      closeFn={action('Close modal')}
      pad={text('Modal body padding', 'medium')}
      plain={boolean('Plain layer', false)}
      position={select('Layer position', layerPositions, 'center')}
      rndProps={object('RND props')}
      title={text('Title', '')}
    >
      {text('Content', EXAMPLE_STRING)}
    </MovableModal>
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
    <MovableModal
      active={boolean('Active', true)}
      animate={boolean('Animate layer', false)}
      closeFn={action('Close modal')}
      headingBackground={text('Heading background color', 'brand')}
      pad={text('Modal body padding', 'medium')}
      plain={boolean('Plain layer', false)}
      position={select('Layer position', layerPositions, 'center')}
      rndProps={object('RND props')}
      title={text('Title', '')}
    >
      {text('Content', EXAMPLE_STRING)}
    </MovableModal>
  </Grommet>
);

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

export const SubTask = () => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1',
    }}
    theme={zooTheme}
    themeMode="light"
  >
    <MovableModal
      active={boolean('Active', true)}
      animate={boolean('Animate layer', false)}
      closeFn={action('Close modal')}
      headingBackground={text('Heading background color', 'transparent')}
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      plain={boolean('Plain layer', true)}
      position={select('Layer position', layerPositions, 'top-left')}
      rndProps={object('RND props')}
      title={text('Title', '')}
      titleColor=""
    >
      <Box gap="xsmall">
        <label>
          <Text size="small">Transcribe the text</Text>
          <TextArea />
        </label>
        <PrimaryButton label="Save" />
      </Box>
    </MovableModal>
  </Grommet>
);

SubTask.story = {
  name: 'Sub-task',
  parameters: config,
};
