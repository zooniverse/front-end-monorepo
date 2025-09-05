import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import SimpleDropdownTask from './SimpleDropdownTask'
import {
  SimpleDropdownTaskMockShort,
  SimpleDropdownTaskMockMedium,
  SimpleDropdownTaskMockLong
} from './SimpleDropdownTask.mock'


export default {
  title: 'Tasks / Simple Dropdown',
  component: SimpleDropdownTask,
  args: {
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
  }
}

export function ShortOptions({ isThereTaskHelp, required, subjectReadyState }) {
  const simpleDropdownTask = {
    allowCreate: false,
    options: [ ...SimpleDropdownTaskMockShort.options ],
    required,
    strings: {
      help: 'Choose an option from the list of options.',
      instruction: 'Select your favourite colour.',
      ...SimpleDropdownTaskMockShort.labels
    },
    taskKey: 'init',
    type: 'dropdown-simple',
  }
  const tasks = {
    init: simpleDropdownTask
  }
  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}


export function MediumOptions({ isThereTaskHelp, required, subjectReadyState }) {
  const simpleDropdownTask = {
    allowCreate: false,
    options: [ ...SimpleDropdownTaskMockMedium.options ],
    required,
    strings: {
      help: 'Choose an option from the list of options.',
      instruction: 'Select your favourite colour.',
      ...SimpleDropdownTaskMockMedium.labels
    },
    taskKey: 'init',
    type: 'dropdown-simple',
  }
  const tasks = {
    init: simpleDropdownTask
  }
  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}

export function LongOptions({ isThereTaskHelp, required, subjectReadyState }) {
  const simpleDropdownTask = {
    allowCreate: false,
    options: [ ...SimpleDropdownTaskMockLong.options ],
    required,
    strings: {
      help: 'Choose an option from the list of options.',
      instruction: 'Select your favourite colour.',
      ...SimpleDropdownTaskMockLong.labels
    },
    taskKey: 'init',
    type: 'dropdown-simple',
  }
  const tasks = {
    init: simpleDropdownTask
  }
  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}
