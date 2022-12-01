import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import { StyledImageToolbarContainer, StyledImageToolbar, ViewerGrid } from '../Layout/components/DefaultLayout/DefaultLayout'
import MultiFrameViewer from '../SubjectViewer/components/MultiFrameViewer'
import SingleImageViewer from '../SubjectViewer/components/SingleImageViewer'
import ImageToolbar from './ImageToolbar'

export default {
  title: 'Image Toolbar / Image Toolbar',
  component: ImageToolbar,
  args: {
    dark: false
  }
}

const subjectSnapshot = SubjectFactory.build({
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
    }
  ]
})

const multiFrameSubjectSnapshot = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg'
    }
  ],
  metadata: {
    default_frame: 1
  }
})

const workflowSnapshot = WorkflowFactory.build({
  configuration: {
    invert_subject: true
  }
})

const store = mockStore({
  subject: subjectSnapshot,
  workflow: workflowSnapshot
})

const multiFrameSubjectStore = mockStore({
  subject: multiFrameSubjectSnapshot,
  workflow: workflowSnapshot
})

export function withSingleImageViewer ({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider
        classifierStore={store}
      >
        <ViewerGrid>
          <Box gridArea='subject'>
            <SingleImageViewer
              loadingState={asyncStates.success}
              subject={store.subjects.active}
            />
          </Box>
          <StyledImageToolbarContainer>
            <StyledImageToolbar />
          </StyledImageToolbarContainer>
        </ViewerGrid>
      </Provider>
    </Grommet>
  )
}

export function withMultiFrameViewer ({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider
        classifierStore={multiFrameSubjectStore}
      >
        <ViewerGrid>
          <Box gridArea='subject'>
            <MultiFrameViewer
              loadingState={asyncStates.success}
              subject={multiFrameSubjectStore.subjects.active}
            />
          </Box>
          <StyledImageToolbarContainer>
            <StyledImageToolbar />
          </StyledImageToolbarContainer>
        </ViewerGrid>
      </Provider>
    </Grommet>
  )
}
