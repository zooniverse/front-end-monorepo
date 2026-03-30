import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

import SingleVideoViewerContainer from './SingleVideoViewerContainer'

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

const portraitVideo = Factory.build('subject', {
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/cef38923-b760-4b72-9bac-2f82734bda4a.mp4'
    }
  ]
})

const drawingTools = [
  {
    color: '#000000',
    label: 'Mock Ellipse Tool',
    type: 'ellipse'
  },
  {
    color: '#FF0000',
    label: 'Mock Freehand Line Tool',
    type: 'freehandLine'
  }
]

const drawingWorkflow = WorkflowFactory.build({
  display_name: 'Video Drawing Task',
  first_task: 'T0',
  tasks: {
    T0: {
      help: '',
      instruction: 'Draw on the video',
      tools: drawingTools,
      type: 'drawing'
    }
  }
})

const limitedHeightWorkflow = WorkflowFactory.build({
  configuration: {
    limit_subject_height: true
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

const limitSubjectHeightStore = mockStore({
  subject: portraitVideo,
  workflow: limitedHeightWorkflow
})

function setDrawingTool(toolType = 'ellipse') {
  const [drawingTask] = drawingStore.workflowSteps.activeStepTasks
  const toolIndex = drawingTools.findIndex(tool => tool.type === toolType)
  drawingTask.setActiveTool(toolIndex === -1 ? 0 : toolIndex)
}

export default {
  title: 'Subject Viewers / SingleVideoViewer',
  component: SingleVideoViewerContainer
}

export const Default = () => {
  return (
    <Provider classifierStore={noDrawingStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          subject={noDrawingStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const WithDrawing = (args) => {
  setDrawingTool(args.toolType)
  return (
    <Provider classifierStore={drawingStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          subject={drawingStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

WithDrawing.argTypes = {
  toolType: {
    control: 'radio',
    options: [
      'ellipse',
      'freehandLine'
    ]
  }
}

export const WithDrawingNoSound = () => {
  return (
    <Provider classifierStore={drawingNoSoundStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          subject={drawingNoSoundStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const NoSubject = () => {
  return (
    <Provider classifierStore={drawingStore}>
      <Box width='large'>
        <SingleVideoViewerContainer />
      </Box>
    </Provider>
  )
}

export const LimitHeight = () => {
  return (
    <Provider classifierStore={limitSubjectHeightStore}>
      <Box width='large'>
        <SingleVideoViewerContainer
          loadingState='success'
          subject={limitSubjectHeightStore.subjects.active}
        />
      </Box>
    </Provider>
  )
}
