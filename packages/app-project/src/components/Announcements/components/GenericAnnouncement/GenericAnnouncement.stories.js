import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';

import GenericAnnouncement from './GenericAnnouncement';
import readme from './README.md';

const ANNOUNCEMENT =
  'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.';

const zooThemeColors = Object.keys(zooTheme.global.colors).filter((color) => {
  return typeof zooTheme.global.colors[color] === 'string';
});

export default {
  title: 'Project App / Screens / Project Home / Announcements / GenericAnnouncement',
  decorators: [withKnobs],
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <GenericAnnouncement
      announcement={text('Announcement', ANNOUNCEMENT)}
      color={select('color', zooThemeColors, 'neutral-2')}
      dismissable={boolean('dismissable', false)}
    />
  </Grommet>
);

Default.story = {
  name: 'default',

  parameters: {
    notes: {
      markdown: readme,
    },
  },
};
