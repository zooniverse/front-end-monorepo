import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import DrawingTask from '../../DrawingTask/components/DrawingTask'

export default {
  title: 'Tasks / Transcription',
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

export function LightTheme({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T3: {
      help: 'Underline the line to transcribe with two clicks, then enter in the text transcription.',
      instruction: 'Underline and transcribe',
      required,
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
  const step = {
    stepKey: 'S1',
    taskKeys: ['T3']
  }
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      step={step}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
