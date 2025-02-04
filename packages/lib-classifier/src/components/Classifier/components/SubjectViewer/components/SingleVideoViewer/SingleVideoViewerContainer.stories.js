import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

import SingleVideoViewerContainer from './'

const subject = Factory.build('subject', {
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/239f17f7-acf9-49f1-9873-266a80d29c33.mp4'
    }
  ]
})

const subjectNoSound = Factory.build('subject', {
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/c13ebff6-bc25-4f33-afe5-5df0565c6839.mp4'
    }
  ]
})

const drawingWorkflow = WorkflowFactory.build({
  display_name: 'Video Drawing Task',
  first_task: 'T0',
  tasks: {
    T0: {
      help: '',
      instruction: 'Draw on the video',
      tools: [
        {
          color: '#000000',
          label: 'Mock Tool',
          type: 'ellipse'
        }
      ],
      type: 'drawing'
    }
  }
})

const noDrawingStore = mockStore({
  subject: subject
})

const drawingStore = mockStore({
  subject: subject,
  workflow: drawingWorkflow
})

const drawingNoSoundStore = mockStore({
  subject: subjectNoSound,
  workflow: drawingWorkflow
})

export default {
  title: 'Subject Viewers / SingleVideoViewer',
  component: SingleVideoViewerContainer
}

export const Default = ({ onError, onReady }) => {
  return (
    <Provider classifierStore={noDrawingStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          onError={onError}
          onReady={onReady}
          subject={noDrawingStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const WithDrawing = ({ onError, onReady }) => {
  return (
    <Provider classifierStore={drawingStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          onError={onError}
          onReady={onReady}
          subject={drawingStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const WithDrawingNoSound = ({ onError, onReady }) => {
  return (
    <Provider classifierStore={drawingNoSoundStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          onError={onError}
          onReady={onReady}
          subject={drawingNoSoundStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const NoSubject = ({ onError, onReady }) => {
  return (
    <Box width='large'>
      <SingleVideoViewerContainer onError={onError} onReady={onReady} />
    </Box>
  )
}
