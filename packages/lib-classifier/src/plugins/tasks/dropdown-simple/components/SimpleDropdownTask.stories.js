import asyncStates from '@zooniverse/async-states'
import React from 'react'
import { MockTask } from '@stories/components'
import SimpleDropdownTask from './SimpleDropdownTask'

export default {
  title: 'Tasks / Simple Dropdown',
  component: SimpleDropdownTask,
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
  const simpleDropdownTask = {
    allowCreate: false,
    options: [
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'White',
      'Black',
    ],
    required,
    strings: {
      help: 'Choose an option from the list of options.',
      instruction: 'Select your favourite colour.',
      'selects.0.options.*.0.label': 'Red',
      'selects.0.options.*.1.label': 'Blue',
      'selects.0.options.*.2.label': 'Yellow',
      'selects.0.options.*.3.label': 'Green',
      'selects.0.options.*.4.label': 'White',
      'selects.0.options.*.5.label': 'Black'
    },
    taskKey: 'init',
    type: 'dropdown-simple',
  }
  const tasks = {
    init: simpleDropdownTask
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
