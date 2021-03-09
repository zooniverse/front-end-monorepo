import { withKnobs } from '@storybook/addon-knobs'
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
import Rectangle from './'

const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
})

const project = ProjectFactory.build()
const workflow = WorkflowFactory.build()
const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a rectangle',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-red'],
    type: 'rectangle'
  }],
  type: 'drawing'
})

const subTasksSnapshot = [
  {
    instruction: 'Name your favourite fruit.',
    taskKey: 'T0.0',
    type: 'text'
  },
  {
    answers: [{ label: "yes" }, { label: "no" }],
    help: "",
    question: "Is it tasty?",
    taskKey: 'T0.1',
    type: 'single'
  },
  {
    answers: [{ label: "cat" }, { label: "dog" }, { label: "bird" }],
    help: "",
    question: "Select your favourite animals.",
    taskKey: 'T0.2',
    type: 'multiple'
  }
]

// should think of a better way to do create bounds for the story
// this is a rough approximation of what the positioning is like now
const nodeMock = {
  getBoundingClientRect: () => ({
    x: 200,
    y: 200,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })
}

function setupStores() {
  drawingTaskSnapshot.tools[0].details = subTasksSnapshot

  const drawingTask = DrawingTask.create(drawingTaskSnapshot)
  drawingTask.setActiveTool(0)
  const rectangle = drawingTask.activeTool.createMark()
  rectangle.initialPosition({ x: 100, y: 100 })
  rectangle.initialDrag({ x: 150, y: 150 })

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
      activeInteractionTask: {},
      activeStepTasks: [drawingTask],
      findTasksByType: () => { return [] },
      interactionTask: {}
    }
  }

  mockStores.classifications.createClassification(subject, workflow, project)

  return mockStores
}

const stores = setupStores()

function updateStores({ activeMark, finished, subtask }) {
  const [ drawingTask ] = stores.workflowSteps.activeStepTasks
  const [ mark ] = drawingTask.marks
  if (finished) {
    drawingTask.setActiveMark(mark.id)
    mark.finish && mark.finish()
  }
  mark.setSubTaskVisibility(subtask, nodeMock)
  if (activeMark) {
    drawingTask.setActiveMark(mark.id)
  } else {
    drawingTask.setActiveMark(undefined)
  }
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

  render () {
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

export default {
  title: 'Drawing tools / Rectangle',
  component: Rectangle,
  decorators: [withKnobs],
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Complete(args) {
  updateStores(args)
  return (
    <DrawingStory stores={stores} />
  )
}
Complete.args = {
  activeMark: false,
  finished: false,
  subtask: false
}

export function Active(args) {
  updateStores(args)
  return (
    <DrawingStory stores={stores} />
  )
}
Active.args = {
  activeMark: true,
  finished: false,
  subtask: false
}

export function Subtask(args) {
  updateStores(args)
  return (
    <DrawingStory stores={stores} />
  )
}
Subtask.args = {
  activeMark: true,
  finished: true,
  subtask: true
}
