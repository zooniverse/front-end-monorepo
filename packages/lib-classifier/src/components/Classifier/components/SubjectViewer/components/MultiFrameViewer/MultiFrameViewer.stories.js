import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import DecoratedMultiFrameViewerContainer, { MultiFrameViewerContainer } from './MultiFrameViewerContainer'
import ImageToolbar from '../../../ImageToolbar'
import SubjectViewerStore from '@store/SubjectViewerStore'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

// using production images from Kittehs subject set for thumbnailer service
const subjectWithMore = Factory.build('subject', {
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg' }
  ],
  metadata: {
    default_frame: 7
  }
})

const subjectWithLess = Factory.build('subject', {
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg' }
  ],
  metadata: {
    default_frame: 1
  }
})

function mockStore (subject) {
  return ({
    classifications: {
      active: {
        annotations: new Map()
      }
    },
    fieldGuide: {},
    subjectViewer: SubjectViewerStore.create({ frame: subject.metadata.default_frame }),
    workflowSteps: {
      activeStepTasks: []
    }
  })
}

function ViewerContext (props) {
  const { children, subject, theme, themeMode } = props
  return (
    <Provider classifierStore={mockStore(subject)}>
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={theme}
        themeMode={themeMode}
      >
        {children}
      </Grommet>
    </Provider>
  )
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

storiesOf('Subject Viewers / MultiFrameViewer', module)
  .addParameters({ component: DecoratedMultiFrameViewerContainer })
  .add('light theme', () => {
    return (
      <ViewerContext subject={subjectWithMore} theme={zooTheme} themeMode='light'>
        <Box>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subjectWithMore}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext subject={subjectWithMore} theme={darkZooTheme} themeMode='dark'>
        <Box>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subjectWithMore}
          />
        </Box>
      </ViewerContext>
    )
  }, darkThemeConfig)
  .add('pan / zoom - more', () => {
    return (
      <ViewerContext mode='light' subject={subjectWithMore} theme={zooTheme}>
        <Box direction='row'>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subjectWithMore}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('pan / zoom - less', () => {
    return (
      <ViewerContext mode='light' subject={subjectWithLess} theme={zooTheme}>
        <Box direction='row'>
          <DecoratedMultiFrameViewerContainer
            enableInteractionLayer={false}
            subject={subjectWithLess}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)
