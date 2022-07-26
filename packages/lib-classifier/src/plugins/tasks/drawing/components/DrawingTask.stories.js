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
      required,
      strings: {
        help: isThereTaskHelp ? 'Draw on the image.' : '',
        instruction: 'Draw something',
        'tools.0.label': 'Draw a line',
        'tools.1.label': 'Point please.',
        'tools.2.label': 'Draw under the text',
        'tools.3.label': 'Draw a rectangle',
        'tools.4.label': 'Draw an ellipse'
      },
      taskKey: 'T2',
      tools: [
        {
          color: zooTheme.global.colors['drawing-red'],
          help: '',
          type: 'line'
        }, {
          color: zooTheme.global.colors['drawing-blue'],
          help: '',
          min: 1,
          max: 2,
          type: 'point',
        }, {
          color: zooTheme.global.colors['drawing-green'],
          help: '',
          type: 'transcriptionLine'
        }, {
          color: zooTheme.global.colors['drawing-orange'],
          help: '',
          type: 'rectangle',
        }, {
          color: zooTheme.global.colors['drawing-yellow'],
          help: '',
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
