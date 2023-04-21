import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import SingleChoiceTask from './SingleChoiceTask'

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
  const tasks = {
    init: {
      answers: [{ label: 'yes' }, { label: 'no' }],
      required,
      strings: {
        help: isThereTaskHelp ? 'Choose an answer from the choices given, then press Done.' : '',
        question: 'Is there a cat?',
        'answers.0.label': 'yes',
        'answers.1.label': 'no'
      },
      taskKey: 'init',
      type: 'single'
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