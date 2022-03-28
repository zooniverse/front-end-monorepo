import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import mockStore from '@test/mockStore'
import {
  DrawingStory,
  subject,
  subTasksSnapshot,
  updateStores
} from '@plugins/drawingTools/stories/helpers'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import Ellipse from './'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw an ellipse',
  taskKey: 'T1',
  tools: [
    {
      color: zooTheme.global.colors['drawing-red'],
      type: 'ellipse',
      details: subTasksSnapshot
    }
  ],
  type: 'drawing'
})

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
    const workflow = WorkflowFactory.build({
      tasks: {
        T1: drawingTaskSnapshot
      }
    })
    const mockStores = mockStore({ subject, workflow })
    const [drawingTask] = mockStores.workflowSteps.active.tasks
    drawingTask.setActiveTool(0)
    const ellipse = drawingTask.activeTool.createMark()
    ellipse.initialPosition({ x: 125, y: 125 })
    ellipse.setCoordinates({ x: 125, y: 125, rx: 50, ry: 20, angle: 2 })

    return mockStores
  } catch (error) {
    console.error(error)
    return null
  }
}

const stores = setupStores()

export default {
  title: 'Drawing tools / Ellipse',
  component: Ellipse,
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
