import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import cuid from 'cuid'
import mockStore from '@test/mockStore'
import DrawingTask from '@plugins/tasks/drawing/models/DrawingTask'
import {
  DrawingStory,
  subject,
  subTasksSnapshot,
  updateStores
} from '@plugins/drawingTools/stories/helpers'
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
    const workflow = WorkflowFactory.build({
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
