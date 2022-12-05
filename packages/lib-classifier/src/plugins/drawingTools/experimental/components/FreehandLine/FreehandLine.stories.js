import zooTheme from '@zooniverse/grommet-theme'
import mockStore from '@test/mockStore'
import {
  DrawingStory,
  subject,
  subTasksSnapshot,
  subtaskStrings,
  updateStores
} from '@plugins/drawingTools/stories/helpers.js'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import FreehandLine from './'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a polygon',
  taskKey: 'T1',
  tools: [
    {
      color: zooTheme.global.colors['drawing-red'],
      type: 'freehandLine',
      details: subTasksSnapshot
    }
  ],
  type: 'drawing'
})

const taskSubtaskStrings = {}
Object.entries(subtaskStrings).forEach(([key, value]) => {
  taskSubtaskStrings[`tools.0.${key}`] = value
})

drawingTaskSnapshot.strings = {
  instruction: drawingTaskSnapshot.instruction,
  ...taskSubtaskStrings
}

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

function setupStores() {
  try {
    const workflowSubtaskStrings = {}
    Object.entries(drawingTaskSnapshot.strings).forEach(([key, value]) => {
      workflowSubtaskStrings[`tasks.T1.${key}`] = value
    })
    const strings = {
      display_name: 'Freehand line workflow',
      'tasks.T1.instruction': 'Draw a freehand line',
      ...workflowSubtaskStrings
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
    const freehandLine = drawingTask.activeTool.createMark()
    freehandLine.initialPosition({ x: 125, y: 125 })
    freehandLine.setCoordinates([
      { x: 125, y: 125 },
      { x: 128, y: 128 },
      { x: 138, y: 157 },
      { x: 175, y: 183 },
      { x: 198, y: 195 },
      { x: 202, y: 205 },
      { x: 215, y: 215 },
      { x: 239, y: 225 },
      { x: 265, y: 235 },
      { x: 286, y: 200 },
      { x: 318, y: 163 },
      { x: 323, y: 168 },
      { x: 333, y: 157 },
      { x: 228, y: 158 },
      { x: 175, y: 202 },
      { x: 170, y: 180 },
      { x: 160, y: 170 },
      { x: 150, y: 160 },
      { x: 140, y: 150 },
      { x: 135, y: 145 },
      { x: 130, y: 140 }
    ])

    return mockStores
  } catch (error) {
    console.error(error)
    return null
  }
}

const stores = setupStores()

export default {
  title: 'Drawing tools / Freehand line',
  component: FreehandLine,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Complete(args) {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}
Complete.args = {
  activeMark: false,
  finished: false,
  subtask: false
}

export function Active(args) {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}
Active.args = {
  activeMark: true,
  finished: false,
  subtask: false
}

export function Subtask(args) {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}
Subtask.args = {
  activeMark: true,
  finished: true,
  subtask: true
}
