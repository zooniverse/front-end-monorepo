import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import FlipbookViewerContainer from './FlipbookViewerContainer'

export default {
  title: 'Subject Viewers / FlipbookViewer',
  component: FlipbookViewerContainer
}

const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/098f3fb6-5021-410a-82a2-477a28b2bcd6.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/8fcb18b0-de80-42cd-ba2a-4871da30c74f.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/85d8d82a-c88d-493c-b3db-7cd9f2ca5ad8.jpeg'
    }
  ]
})

const store = mockStore({
  subject: mockSubject
})

export const Default = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={store.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const StyledSmallerWidth = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='499px'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={store.subjects.active}
        />
      </Box>
    </Provider>
  )
}

const subjectWithDefaultFrame = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/098f3fb6-5021-410a-82a2-477a28b2bcd6.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/8fcb18b0-de80-42cd-ba2a-4871da30c74f.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/85d8d82a-c88d-493c-b3db-7cd9f2ca5ad8.jpeg'
    }
  ],
  metadata: {
    default_frame: 3
  }
})

const storeWithDefaultFrame = mockStore({
  subject: subjectWithDefaultFrame
})

export const WithDefaultFrame = () => {
  return (
    <Provider classifierStore={storeWithDefaultFrame}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={storeWithDefaultFrame.subjects.active}
        />
      </Box>
    </Provider>
  )
}

const workflowWithFiveIterations = WorkflowFactory.build({
  configuration: {
    playIterations: '5'
  }
})

const storeWithFiveIterationWorkflow = mockStore({
  subject: mockSubject,
  workflow: workflowWithFiveIterations
})

export const FivePlayIterations = () => {
  return (
    <Provider classifierStore={storeWithFiveIterationWorkflow}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={storeWithFiveIterationWorkflow.subjects.active}
        />
      </Box>
    </Provider>
  )
}

const workflowWithInfiniteIterations = WorkflowFactory.build({
  configuration: {
    playIterations: ''
  }
})

const storeWithInfiniteIterationWorkflow = mockStore({
  subject: mockSubject,
  workflow: workflowWithInfiniteIterations
})

export const InfiniteIterations = () => {
  return (
    <Provider classifierStore={storeWithInfiniteIterationWorkflow}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={storeWithInfiniteIterationWorkflow.subjects.active}
        />
      </Box>
    </Provider>
  )
}

const workflowWithAutoplay = WorkflowFactory.build({
  configuration: {
    playIterations: '',
    flipbook_autoplay: true
  }
})

const storeWithAutoplayWorkflow = mockStore({
  subject: mockSubject,
  workflow: workflowWithAutoplay
})

export const Autoplay = () => {
  return (
    <Provider classifierStore={storeWithAutoplayWorkflow}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={storeWithAutoplayWorkflow.subjects.active}
        />
      </Box>
    </Provider>
  )
}

const workflowWithSwitchToSeparateFrames = WorkflowFactory.build({
  configuration: {
    enable_switching_flipbook_and_separate: true
  }
})
const storeWithSwitchToSeparateFrames = mockStore({
  subject: mockSubject,
  workflow: workflowWithSwitchToSeparateFrames
})

export const WithViewModeButton = () => {
  return (
    <Provider classifierStore={storeWithSwitchToSeparateFrames}>
      <Box width='large'>
        <FlipbookViewerContainer
          loadingState={asyncStates.success}
          subject={storeWithSwitchToSeparateFrames.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const NoSubject = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <FlipbookViewerContainer loadingState={asyncStates.success} subject={{}} />
      </Box>
    </Provider>
  )
}
