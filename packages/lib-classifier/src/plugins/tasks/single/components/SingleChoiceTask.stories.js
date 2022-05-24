import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import SingleChoiceTask from './SingleChoiceTask'

export default {
  title: 'Tasks / Single Choice Question',
  component: SingleChoiceTask,
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
    init: {
      answers: [{ label: 'yes' }, { label: 'no' }],
      required,
      strings: {
        help: isThereTaskHelp ? 'Choose an answer from the choices given, then press Done.' : '',
        question: 'Is there a cat?'
      },
      taskKey: 'init',
      type: 'single'
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