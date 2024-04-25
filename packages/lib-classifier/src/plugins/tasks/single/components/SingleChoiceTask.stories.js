import asyncStates from '@zooniverse/async-states'
import { useEffect } from 'react'

import { MockTask } from '@stories/components'
import SingleChoiceTask from './SingleChoiceTask'
import mockTask from './mockTask'

export default {
  title: 'Tasks / Single Choice Question',
  component: SingleChoiceTask,
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
  const taskSnapshot = {
    ...mockTask,
    required,
    strings: {
      ...mockTask.strings,
      help: isThereTaskHelp ? 'Choose an answer from the choices given, then press Done.' : ''
    }
  }
  const tasks = {
    init: taskSnapshot
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
  const taskSnapshot = {
    ...mockTask,
    required,
    strings: {
      ...mockTask.strings,
      help: isThereTaskHelp ? 'Choose an answer from the choices given, then press Done.' : ''
    }
  }
  const tasks = {
    init: taskSnapshot
  }
  
  useEffect(() => {
    MockTask.store.classifications.addAnnotation(tasks.init, 0)
  },[])

  return (
    <MockTask
      isThereTaskHelp={isThereTaskHelp}
      subjectReadyState={subjectReadyState}
      tasks={tasks}
    />
  )
}