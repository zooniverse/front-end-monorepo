import asyncStates from '@zooniverse/async-states'
import { MockTask } from '@stories/components'
import MultipleChoiceTask from './MultipleChoiceTask'

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
      answers: [{ label: 'sleeping' }, { label: 'playing' }, { label: 'looking indifferent' }],
      required,
      strings: {
        help: isThereTaskHelp ? 'Pick as many answers as apply, then press Done.' : '',
        question: 'What is it doing?',
        'answers.0.label': 'sleeping',
        'answers.1.label': 'playing',
        'answers.2.label': 'looking indifferent'
      },
      taskKey: 'T1',
      type: 'multiple'
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
