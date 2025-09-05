import mockStore from '@test/mockStore'
import {
  DrawingStory,
  subject,
  subtaskStrings,
  updateStores
} from '@plugins/drawingTools/stories/helpers'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import FreehandLine from '.'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a polygon',
  taskKey: 'T1',
  tools: [
    {
      type: 'freehandLine',
    }
  ],
  type: 'drawing'
})

const taskSubtaskStrings = {}
Object.entries(subtaskStrings).forEach(([key, value]) => {
  const subtaskKey = `tools.0.${key}`
  taskSubtaskStrings[subtaskKey] = value
})

drawingTaskSnapshot.strings = {
  instruction: drawingTaskSnapshot.instruction,
  ...taskSubtaskStrings
}

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

let freehandLineTool

function setupStores() {
  try {
    const workflowSubtaskStrings = {}
    Object.entries(drawingTaskSnapshot.strings).forEach(([key, value]) => {
      const taskKey = `tasks.T1.${key}`
      workflowSubtaskStrings[taskKey] = value
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
    freehandLineTool = drawingTask.activeTool.createMark({}, [
      { x: 200, y: 100 },
      { x: 175, y: 75 },
      { x: 150, y: 75 },
      { x: 125, y: 100 },
      { x: 125, y: 125 },
      { x: 150, y: 150 },
      { x: 175, y: 150 },
      { x: 200, y: 125 },
      { x: 201, y: 101 },
    ])

    freehandLineTool = drawingTask.activeTool.createMark({}, [
      { x: 400, y: 100 },
      { x: 375, y: 75 },
      { x: 350, y: 75 },
      { x: 325, y: 100 },
      { x: 325, y: 125 },
      { x: 350, y: 150 },
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

export const Drawing = (args) => {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}
