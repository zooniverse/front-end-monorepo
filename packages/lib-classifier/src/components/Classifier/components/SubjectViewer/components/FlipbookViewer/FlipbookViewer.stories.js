import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import FlipbookViewerContainer from './FlipbookViewerContainer'

export default {
  title: 'Subject Viewers / FlipbookViewer',
  component: FlipbookViewerContainer,
  args: {
    dark: false
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
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

export const Default = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <Box width='large'>
          <FlipbookViewerContainer
            loadingState={asyncStates.success}
            subject={store.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export const StyledSmallerWidth = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <Box width='499px'>
          <FlipbookViewerContainer
            loadingState={asyncStates.success}
            subject={store.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
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

export const WithDefaultFrame = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={storeWithDefaultFrame}>
        <Box width='large'>
          <FlipbookViewerContainer
            loadingState={asyncStates.success}
            subject={storeWithDefaultFrame.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
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

export const FivePlayIterations = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={storeWithFiveIterationWorkflow}>
        <Box width='large'>
          <FlipbookViewerContainer
            loadingState={asyncStates.success}
            subject={storeWithFiveIterationWorkflow.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
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

export const InfiniteIterations = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={storeWithInfiniteIterationWorkflow}>
        <Box width='large'>
          <FlipbookViewerContainer
            loadingState={asyncStates.success}
            subject={storeWithInfiniteIterationWorkflow.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export const NoSubject = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <Box width='large'>
          <FlipbookViewerContainer loadingState={asyncStates.success} />
        </Box>
      </Provider>
    </Grommet>
  )
}
