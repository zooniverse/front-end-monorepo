import asyncStates from '@zooniverse/async-states'
import { useEffect } from 'react'

import { MockTask } from '@stories/components'
import MultipleChoiceTask from './MultipleChoiceTask'
import mockTask from './mockTask'

export default {
  title: 'Tasks / Multiple Choice Question',
  component: MultipleChoiceTask,
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

export function Default({ isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T1: {
      ...mockTask,
      required,
      strings: {
        ...mockTask.strings,
        help: isThereTaskHelp ? 'Pick as many answers as apply, then press Done.' : '',
      }
    }
  }

  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}

export function WithAnnotation({ isThereTaskHelp, required, subjectReadyState }) {
  const tasks = {
    T1: {
      ...mockTask,
      required,
      strings: {
        ...mockTask.strings,
        help: isThereTaskHelp ? 'Pick as many answers as apply, then press Done.' : '',
      }
    }
  }

  useEffect(() => {
    MockTask.store.classifications.addAnnotation(tasks.T1, [0,2])
  }, [])

  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}

