import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import TextTask from './TextTask'

export default {
  title: 'Tasks / Text',
  component: TextTask,
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

export function Default({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T0: {
      help: 'Type something into the text box.',
      instruction: 'Type something here',
      required,
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
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

export function withSuggestions({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T0: {
      help: 'Type something into the text box.',
      instruction: 'Type something here',
      required,
      taskKey: 'T0',
      text_tags: ['insertion', 'deletion', '&'],
      type: 'text'
    }
  }
  const previousAnnotationValues = new Map([[ 'T0', ['a', 'b', 'c']]])
  return (
    <MockTask
      dark={dark}
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      previousAnnotationValues={previousAnnotationValues}
      tasks={tasks}
    />
  )
}