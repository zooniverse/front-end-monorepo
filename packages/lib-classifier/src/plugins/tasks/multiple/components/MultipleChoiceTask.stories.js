import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import MultipleChoiceTask from './MultipleChoiceTask'

export default {
  title: 'Tasks / Multiple Choice Question',
  component: MultipleChoiceTask,
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
    T1: {
      answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
      required,
      strings: {
        help: isThereTaskHelp ? 'Pick as many answers as apply, then press Done.' : '',
        question: 'What is it doing?'
      },
      taskKey: 'T1',
      type: 'multiple'
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
