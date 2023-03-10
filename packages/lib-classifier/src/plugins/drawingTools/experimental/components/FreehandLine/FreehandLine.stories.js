import zooTheme from '@zooniverse/grommet-theme'
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
      { x: 187, y: 255 },
      { x: 188, y: 254 },
      { x: 188, y: 253 },
      { x: 187, y: 252 },
      { x: 187, y: 251 },
      { x: 186, y: 250 },
      { x: 185, y: 250 },
      { x: 184, y: 250 },
      { x: 183, y: 250 },
      { x: 183, y: 249 },
      { x: 183, y: 248 },
      { x: 183, y: 247 },
      { x: 183, y: 246 },
      { x: 183, y: 245 },
      { x: 183, y: 244 },
      { x: 183, y: 243 },
      { x: 183, y: 242 },
      { x: 182, y: 241 },
      { x: 182, y: 240 },
      { x: 181, y: 239 },
      { x: 181, y: 238 },
      { x: 181, y: 237 },
      { x: 180, y: 236 },
      { x: 180, y: 235 },
      { x: 179, y: 234 },
      { x: 179, y: 233 },
      { x: 178, y: 232 },
      { x: 177, y: 232 },
      { x: 176, y: 232 },
      { x: 175, y: 232 },
      { x: 175, y: 231 },
      { x: 174, y: 230 },
      { x: 173, y: 230 },
      { x: 173, y: 229 },
      { x: 172, y: 228 },
      { x: 171, y: 227 },
      { x: 170, y: 226 },
      { x: 169, y: 226 },
      { x: 169, y: 225 },
      { x: 168, y: 224 },
      { x: 167, y: 223 },
      { x: 166, y: 222 },
      { x: 165, y: 222 },
      { x: 165, y: 221 },
      { x: 164, y: 220 },
      { x: 163, y: 220 },
      { x: 162, y: 220 },
      { x: 161, y: 220 },
      { x: 160, y: 220 },
      { x: 159, y: 220 },
      { x: 158, y: 220 },
      { x: 157, y: 220 },
      { x: 157, y: 219 },
      { x: 156, y: 218 },
      { x: 155, y: 217 },
      { x: 154, y: 216 },
      { x: 153, y: 216 },
      { x: 152, y: 216 },
      { x: 151, y: 216 },
      { x: 150, y: 216 },
      { x: 149, y: 216 },
      { x: 148, y: 216 },
      { x: 147, y: 216 },
      { x: 146, y: 216 },
      { x: 145, y: 216 },
      { x: 144, y: 216 },
      { x: 143, y: 216 },
      { x: 142, y: 216 },
      { x: 141, y: 216 },
      { x: 140, y: 216 },
      { x: 139, y: 216 },
      { x: 138, y: 216 },
      { x: 137, y: 216 },
      { x: 136, y: 216 },
      { x: 135, y: 216 },
      { x: 134, y: 216 },
      { x: 133, y: 216 },
      { x: 132, y: 216 },
      { x: 131, y: 217 },
      { x: 130, y: 218 },
      { x: 129, y: 218 },
      { x: 128, y: 219 },
      { x: 127, y: 219 },
      { x: 126, y: 220 },
      { x: 125, y: 220 },
      { x: 124, y: 220 },
      { x: 123, y: 219 },
      { x: 122, y: 219 },
      { x: 121, y: 219 },
      { x: 120, y: 220 },
      { x: 119, y: 220 },
      { x: 118, y: 221 },
      { x: 117, y: 222 },
      { x: 116, y: 223 },
      { x: 116, y: 224 },
      { x: 115, y: 224 },
      { x: 114, y: 225 },
      { x: 114, y: 226 },
      { x: 113, y: 227 },
      { x: 113, y: 228 },
      { x: 112, y: 229 },
      { x: 112, y: 230 },
      { x: 111, y: 230 },
      { x: 110, y: 231 },
      { x: 110, y: 232 },
      { x: 109, y: 232 },
      { x: 108, y: 233 },
      { x: 108, y: 234 },
      { x: 107, y: 235 },
      { x: 107, y: 236 },
      { x: 106, y: 236 },
      { x: 105, y: 237 },
      { x: 105, y: 238 },
      { x: 104, y: 239 },
      { x: 104, y: 240 },
      { x: 104, y: 241 },
      { x: 104, y: 242 },
      { x: 103, y: 242 },
      { x: 102, y: 243 },
      { x: 102, y: 244 },
      { x: 102, y: 245 },
      { x: 101, y: 246 },
      { x: 100, y: 247 },
      { x: 100, y: 248 },
      { x: 100, y: 249 },
      { x: 100, y: 250 },
      { x: 100, y: 251 },
      { x: 100, y: 252 },
      { x: 100, y: 253 },
      { x: 100, y: 254 },
      { x: 100, y: 255 }
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
      deafaultViewport: 'responsive'
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
