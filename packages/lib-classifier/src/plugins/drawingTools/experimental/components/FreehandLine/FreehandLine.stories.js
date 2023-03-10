import mockStore from '@test/mockStore'
import {
  DrawingStory,
  subject,
  subtaskStrings,
  updateStores
} from '@plugins/drawingTools/stories/helpers.js'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import { within, fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import FreehandLine from './'

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
  taskSubtaskStrings[`tools.0.${key}`] = value
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

export const Close = (args) => {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}

Close.args = {
  activeMark: true,
}

Close.play = async ({ canvasElement }) => {
  const user = userEvent.setup()
  const canvas = within(canvasElement);
  setTimeout(async () => {
    await user.click(canvas.getByTestId('mark-mark'));
    await fireEvent.pointerDown(canvas.getByTestId('drawing-drag-handle'), {
      pointerId: 1
    });
    await fireEvent.pointerMove(canvas.getByTestId('drawing-drag-handle'), {
      pointerId: 1,
      clientX: 100,
      clientY: 255
    });
    // await fireEvent.pointerMove(canvas.getByTestId('drawing-drag-handle'), {
    //   pointerId: 1,
    //   clientX: 130,
    //   clientY: 255
    // });
    // await fireEvent.pointerMove(canvas.getByTestId('drawing-drag-handle'), {
    //   pointerId: 1,
    //   clientX: 130,
    //   clientY: 280
    // });
    await fireEvent.pointerUp(canvas.getByTestId('drawing-drag-handle'), {
      pointerId: 1,
    });

  }, 500);

  //freehandLineTool.close()
}

export const Undo = (args) => {
  updateStores(args, mockBounds, stores)
  return <DrawingStory stores={stores} />
}

Undo.args = {
  activeMark: true,
}

Undo.play = async ({ canvasElement }) => {
  freehandLineTool.undo()
  fireEvent
}
