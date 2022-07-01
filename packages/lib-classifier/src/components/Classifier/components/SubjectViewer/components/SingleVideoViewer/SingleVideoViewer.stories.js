import React from 'react';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import { Provider } from 'mobx-react';
import { Factory } from 'rosie';
import SubjectViewerStore from '@store/SubjectViewerStore';
import SingleImageViewer from '@viewers/components/SingleImageViewer';
import ImageToolbar from '../../../ImageToolbar';
import readme from './README.md';
import backgrounds from '../../../../../../../.storybook/lib/backgrounds';

const config = {
  notes: {
    markdown: readme,
  },
};

const subject = Factory.build('subject', {
  locations: [{ 'image/jpeg': 'http://placekitten.com/500/300' }],
});

const mockStore = {
  classifications: {
    active: {
      annotations: new Map(),
    },
  },
  fieldGuide: {
    setModalVisibility: () => {},
  },
  subjects: {
    active: subject,
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflows: {
    active: {}
  },
  workflowSteps: {
    activeStepTasks: [],
  },
};

function ViewerContext(props) {
  const { children, theme } = props;
  return (
    <Provider classifierStore={mockStore}>
      <Grommet theme={theme}>{children}</Grommet>
    </Provider>
  );
}

const darkThemeConfig = Object.assign({}, config, {
  backgrounds: backgrounds.darkDefault,
});

export default {
  title: 'Subject Viewers / SingleVideoViewer',

  parameters: {
    component: SingleImageViewer,
  },
};

export const LightTheme = () => {
  return (
    <ViewerContext theme={zooTheme}>
      <Box height="medium" width="large">
        <SingleImageViewer />
      </Box>
    </ViewerContext>
  );
};

LightTheme.story = {
  name: 'light theme',
  parameters: config,
};

export const DarkTheme = () => {
  const darkZooTheme = Object.assign({}, zooTheme, { dark: true });
  return (
    <ViewerContext theme={darkZooTheme}>
      <Box height="medium" width="large">
        <SingleImageViewer />
      </Box>
    </ViewerContext>
  );
};

DarkTheme.story = {
  name: 'dark theme',
  parameters: darkThemeConfig,
};

export const WithZoomControls = () => {
  return (
    <ViewerContext theme={zooTheme}>
      <Box direction="row" height="500px" width="large">
        <SingleImageViewer />
        <ImageToolbar />
      </Box>
    </ViewerContext>
  );
};

WithZoomControls.story = {
  name: 'with zoom controls',
  parameters: config,
};
