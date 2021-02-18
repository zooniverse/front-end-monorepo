import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import React from 'react'
import { MockTask } from '@stories/components'
import DrawingTask from './DrawingTask'

export default {
  title: 'Tasks / Drawing ',
  component: DrawingTask,
  args: {
    dark: false,
    isThereTaskHelp: true,
    required: false,
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    subjectReadyState: {
      control: {
        type: 'select',
        options: asyncStates
      }
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Drawing({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T2: {
      help: 'Draw on the image.',
      instruction: 'Draw something',
      required,
      taskKey: 'T2',
      tools: [
        {
          color: zooTheme.global.colors['drawing-red'],
          help: '',
          label: 'Draw a line',
          type: 'line'
        }, {
          color: zooTheme.global.colors['drawing-blue'],
          help: '',
          label: 'Point please.',
          min: 1,
          max: 2,
          type: 'point',
        }, {
          color: zooTheme.global.colors['drawing-green'],
          help: '',
          label: 'Draw under the text',
          type: 'transcriptionLine'
        }, {
          color: zooTheme.global.colors['drawing-orange'],
          help: '',
          label: 'Draw a rectangle',
          type: 'rectangle',
        }, {
          color: zooTheme.global.colors['drawing-yellow'],
          help: '',
          label: 'Draw an ellipse',
          type: 'ellipse',
        }
      ],
      type: 'drawing'
    }
  }
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
