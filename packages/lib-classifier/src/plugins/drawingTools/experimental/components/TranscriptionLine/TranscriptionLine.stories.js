import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component } from 'react'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import cuid from 'cuid'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import ClassificationStore from '@store/ClassificationStore'
import SubjectViewerStore from '@store/SubjectViewerStore'
import DrawingTask from '@plugins/tasks/DrawingTask/models/DrawingTask'
import { DrawingTaskFactory, ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'

const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
})

const project = ProjectFactory.build()
const workflow = WorkflowFactory.build()
const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a line under the text',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-orange'],
    type: 'transcriptionLine'
  }],
  type: 'drawing'
})

const subTasksSnapshot = [
  {
    instruction: 'transcribe the text.',
    taskKey: 'T0.0',
    type: 'text'
  }
]

// should think of a better way to do create bounds for the story
// this is a rough approximation of what the positioning is like now
const nodeMock = {
  getBoundingClientRect: () => ({
    x: 245,
    y: 165,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })
}

function setupStores({ activeMark, finished, subtask }) {
  if (subtask) {
    drawingTaskSnapshot.tools[0].details = subTasksSnapshot
  }

  const drawingTask = DrawingTask.create(drawingTaskSnapshot)
  drawingTask.setActiveTool(0)
  const transcriptionLine = drawingTask.activeTool.createMark({ x1: 100, y1: 100, x2: 200, y2: 105 })
  if (subtask) {
    transcriptionLine.setSubTaskVisibility(true, nodeMock)
  }
  if (finished) transcriptionLine.finish()

  const mockStores = {
    classifications: ClassificationStore.create(),
    subjects: {
      active: subject
    },
    subjectViewer: SubjectViewerStore.create(),
    workflows: {
      active: { id: cuid() }
    },
    workflowSteps: {
      activeStepTasks: [drawingTask]
    }
  }

  mockStores.classifications.createClassification(subject, workflow, project)
  if (activeMark) {
    mockStores.workflowSteps.activeStepTasks[0].setActiveMark(transcriptionLine.id)
  }

  return mockStores
}

class DrawingStory extends Component {
  constructor() {
    super()

    this.state = {
      loadingState: asyncStates.initialized
    }
  }

  componentDidMount() {
    // what needs this time to make the svg ref to be defined?
    // 100ms isn't enough time 1000ms is
    setTimeout(() => this.setState({ loadingState: asyncStates.success }), 1000)
  }

  render() {
    return (
      <Provider classifierStore={this.props.stores}>
        <Grommet
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          theme={zooTheme}
          themeMode='light'
        >
          <Box height='medium' width='large'>
            <SingleImageViewer
              loadingState={this.state.loadingState}
              subject={subject}
            />
          </Box>
        </Grommet>
      </Provider>
    )
  }
}

storiesOf('Drawing Tools / TranscriptionLine', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('in drawing task, drawing complete', function () {
    const stores = setupStores({ activeMark: false, finished: true, subtask: false })
    return (
      <DrawingStory stores={stores} />
    )
  })
  .add('in drawing task, active', function () {
    const stores = setupStores({ activeMark: true, subtask: false })
    return (
      <DrawingStory stores={stores} />
    )
  })
  .add('in drawing task, active, with sub-task', function () {
    const stores = setupStores({ activeMark: true, subtask: true })
    return (
      <DrawingStory stores={stores} />
    )
  })

