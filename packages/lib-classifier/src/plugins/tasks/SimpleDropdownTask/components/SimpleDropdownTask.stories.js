import { withKnobs, boolean, radios, select } from '@storybook/addon-knobs'
import asyncStates from '@zooniverse/async-states'
import { storiesOf } from '@storybook/react'
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
    instruction: 'Choose your favourite colour',
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
    taskKey: 'init',
    type: 'dropdown-simple',
  }
  const tasks = {
    init: simpleDropdownTask
  }
  const step = {
    stepKey: 'S1',
    taskKeys: ['init']
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
