import zooTheme from '@zooniverse/grommet-theme'
import cuid from 'cuid'
import mockStore from '@test/mockStore'
import DrawingTask from '@plugins/tasks/drawing/models/DrawingTask'
import { DrawingStory, subject, updateStores } from '@plugins/drawingTools/stories/helpers.js'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import TranscriptionLine from './'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a line under the text',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-orange'],
    type: 'transcriptionLine',
    details: [{
      instruction: 'transcribe the text.',
      taskKey: 'T0.0',
      type: 'text'
    }]
  }],
  type: 'drawing'
})

// should think of a better way to do create bounds for the story
// this is a rough approximation of what the positioning is like now
const mockBounds = {
  x: 122.5,
  y: 132.5,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

function setupStores() {
  try {
    const strings = {
      display_name: 'Transcription line workflow',
      'tasks.T1.instruction': 'Draw a line under the text',
      'tasks.T1.tools.0.details.0.instruction': 'transcribe the text.'
    }
    const workflow = WorkflowFactory.build({
      strings,
      tasks: {
        T1: drawingTaskSnapshot
      }
    })
    const mockStores = mockStore({ subject, workflow })
    const [drawingTask] = mockStores.workflowSteps.active.tasks
    drawingTask.setActiveTool(0)
    const transcriptionLine = drawingTask.activeTool.createMark({ x1: 100, y1: 100, x2: 200, y2: 105 })

    return mockStores
  } catch (error) {
    console.error(error)
    return null
  }
}

const stores = setupStores()

export default {
  title: 'Drawing tools / Transcription Line',
  component: TranscriptionLine,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Complete(args) {
  updateStores(args, mockBounds, stores)
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
  updateStores(args, mockBounds, stores)
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
  updateStores(args, mockBounds, stores)
  return (
    <DrawingStory stores={stores} />
  )
}
Subtask.args = {
  activeMark: true,
  finished: true,
  subtask: true
}

