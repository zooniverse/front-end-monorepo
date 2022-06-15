import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import mockStore from '@test/mockStore'
import {
  DrawingStory,
  subject,
  subTasksSnapshot,
  subtaskStrings,
  updateStores
} from '@plugins/drawingTools/stories/helpers.js'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import Circle from './'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a circle',
  taskKey: 'T1',
  tools: [
    {
      color: zooTheme.global.colors['drawing-red'],
      type: 'circle',
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

const mockBounds = {
  x: 200,
  y: 200,
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
      display_name: 'Circle workflow',
      'tasks.T1.instruction': 'Draw a circle',
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
    const circle = drawingTask.activeTool.createMark()
    circle.initialPosition({ x: 200, y: 200 })
    circle.initialDrag({ x: 150, y: 150 })

    return mockStores
  } catch (error) {
    console.error(error)
    return null
  }
}

const stores = setupStores()

export default {
  title: 'Drawing tools / Circle',
  component: Circle,
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
