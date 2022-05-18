import { withKnobs, text } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import { Provider } from 'mobx-react';

import FinishedAnnouncementConnector from './FinishedAnnouncementConnector';
import readme from './README.md';

const mockStore = {
  project: {
    baseUrl: '/projects/zookeeper/galaxy-zoo',
    isComplete: true,
  },
};

export default {
  title: 'Project App / Screens / Project Home / Announcements / FinishedAnnouncement',
  decorators: [withKnobs],
};

export const Default = () => (
  <Provider store={mockStore}>
    <Grommet theme={zooTheme}>
      <FinishedAnnouncementConnector />
    </Grommet>
  </Provider>
);

Default.story = {
  name: 'default',

  parameters: {
    notes: {
      markdown: readme,
    },
  },
};
