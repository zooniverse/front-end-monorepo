import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { Box, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import asyncStates from '@zooniverse/async-states'
import cuid from 'cuid'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import mockStore from '@test/mockStore'
import DrawingTask from '@plugins/tasks/DrawingTask/models/DrawingTask'
import { DrawingTaskFactory, ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import Point from './'

const subject = SubjectFactory.build({
  locations: [
    { 'image/jpeg': 'http://placekitten.com/1000/600' }
  ]
})

const project = ProjectFactory.build()
const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a point',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-red'],
    type: 'point'
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
const mockBounds = {
  x: 100,
  y: 100,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

function setupStores () {
  drawingTaskSnapshot.tools[0].details = subTasksSnapshot 

  const workflow = WorkflowFactory.build({
    tasks: {
      T1: drawingTaskSnapshot
    }
  })
  const mockStores = mockStore({ workflow })
  const [drawingTask] = mockStores.workflowSteps.active.tasks
  drawingTask.setActiveTool(0)
  const point = drawingTask.activeTool.createMark()
  point.move({ x: 100, y: 100 })

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
  mark.setSubTaskVisibility(subtask, mockBounds)
  if (activeMark) {
    drawingTask.setActiveMark(mark.id)
  } else {
    drawingTask.setActiveMark(undefined)
  }
}

class DrawingStory extends Component {
  constructor () {
    super()

    this.state = {
      loadingState: asyncStates.initialized
    }
  }

  componentDidMount () {
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
  title: 'Drawing tools / Point',
  component: Point,
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

