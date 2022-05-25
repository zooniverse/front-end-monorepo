import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import DrawingTask from '@plugins/tasks/drawing'

export default {
  title: 'Tasks / Transcription',
  component: DrawingTask.TaskComponent,
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

export function LightTheme({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T3: {
      required,
      strings: {
        help: 'Underline the line to transcribe with two clicks, then enter in the text transcription.',
        instruction: 'Underline and transcribe',
        'tools.0.label': 'Draw under the text'
      },
      taskKey: 'T3',
      tools: [
        {
          help: '',
          label: 'Draw under the text',
          type: 'transcriptionLine'
        }
      ],
      type: 'transcription'
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
