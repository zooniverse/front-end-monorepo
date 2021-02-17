import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@helpers'
import Tasks from './Tasks'

export default {
  title: 'Tasks / General',
  component: Tasks,
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

export function Loading() {
  return (
    <MockTask
      loadingState={asyncStates.loading}
    />
  )
}

export function Error() {
  return (
    <MockTask
      loadingState={asyncStates.error}
    />
  )
}

export function MultipleTasks({ dark, isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    init: {
      answers: [{ label: 'yes' }, { label: 'no' }],
      help: 'Choose an answer from the choices given, then press Done.',
      question: 'Is there a cat?',
      required,
      taskKey: 'init',
      type: 'single'
    },
    T1: {
      answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
      help: 'Pick as many answers as apply, then press Done.',
      question: 'What is it doing?',
      required,
      taskKey: 'T1',
      type: 'multiple'
    }
  }
  const step = {
    stepKey: 'S1',
    taskKeys: ['init', 'T1']
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