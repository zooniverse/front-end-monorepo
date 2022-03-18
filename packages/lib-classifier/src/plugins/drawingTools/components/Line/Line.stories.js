import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import cuid from 'cuid'
import mockStore from '@test/mockStore'
import DrawingTask from '@plugins/tasks/drawing/models/DrawingTask'
import { DrawingStory, subject, subTasksSnapshot, updateStores } from '@plugins/drawingTools/stories/helpers'
import { DrawingTaskFactory, WorkflowFactory } from '@test/factories'
import Line from './'

const drawingTaskSnapshot = DrawingTaskFactory.build({
  instruction: 'Draw a line',
  taskKey: 'T1',
  tools: [{
    color: zooTheme.global.colors['drawing-red'],
    type: 'line',
    details: subTasksSnapshot
  }],
  type: 'drawing'
})


// should think of a better way to do create bounds for the story
// this is a rough approximation of what the positioning is like now
const mockBounds = {
  x: 125,
  y: 125,
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
    const line = drawingTask.activeTool.createMark()
    line.initialPosition({ x: 100, y: 100 })
    line.initialDrag({ x: 200, y: 200 })

    return mockStores
  } catch (error) {
    console.error(error)
    return null
  }
}

const stores = setupStores()

export default {
  title: 'Drawing tools / Line',
  component: Line,
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
