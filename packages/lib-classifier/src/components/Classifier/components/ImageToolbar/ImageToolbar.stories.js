import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import { ViewerGrid } from '../Layout/components/shared/StyledContainers'
import MultiFrameViewer from '../SubjectViewer/components/MultiFrameViewer'
import SingleImageViewer from '../SubjectViewer/components/SingleImageViewer'
import SingleTextViewer from '../SubjectViewer/components/SingleTextViewer'
import ImageToolbar from './ImageToolbar'

export default {
  title: 'Image Toolbar / Image Toolbar',
  component: ImageToolbar
}

const subjectSnapshot = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
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

const textSubjectSnapshot = SubjectFactory.build({
  locations: [
    {
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/82eef33c-11ef-4f96-a4b3-526fc2d4e82f.txt'
    }
  ]
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

const textSubjectStore = mockStore({
  subject: textSubjectSnapshot,
  workflow: workflowSnapshot
})

export function withSingleImageViewer() {
  return (
    <Provider classifierStore={store}>
      <ViewerGrid>
        <Box gridArea='subject'>
          <SingleImageViewer
            loadingState={asyncStates.success}
            subject={store.subjects.active}
          />
        </Box>
        <ImageToolbar />
      </ViewerGrid>
    </Provider>
  )
}

export function withMultiFrameViewer() {
  return (
    <Provider classifierStore={multiFrameSubjectStore}>
      <ViewerGrid>
        <Box gridArea='subject'>
          <MultiFrameViewer
            loadingState={asyncStates.success}
            subject={multiFrameSubjectStore.subjects.active}
          />
        </Box>
        <ImageToolbar />
      </ViewerGrid>
    </Provider>
  )
}

export function withSingleTextViewer() {
  return (
    <Provider classifierStore={textSubjectStore}>
      <ViewerGrid>
        <Box gridArea='subject'>
          <SingleTextViewer
            loadingState={asyncStates.success}
            subject={textSubjectStore.subjects.active}
          />
        </Box>
        <ImageToolbar />
      </ViewerGrid>
    </Provider>
  )
}

export function StyledSmallerWidth() {
  return (
    <Provider classifierStore={store}>
      <Box width='500px'>
        <ViewerGrid>
          <Box gridArea='subject'>
            <SingleImageViewer
              loadingState={asyncStates.success}
              subject={store.subjects.active}
            />
          </Box>
          <ImageToolbar />
        </ViewerGrid>
      </Box>
    </Provider>
  )
}
