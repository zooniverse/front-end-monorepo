import { WorkflowFactory } from '@test/factories'

const singleChoiceTask = {
  answers: [{ label: 'yes', next: 'T1' }, { label: 'no', next: 'T2' }],
  question: 'Is there a cat?',
  required: false,
  taskKey: 'T0',
  type: 'single'
}
const multipleChoiceTask = {
  answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
  question: 'What is/are the cat(s) doing?',
  required: false,
  taskKey: 'T1',
  type: 'multiple'
}
const alternativeTask = {
  answers: [{ label: 'oranges' }, { label: 'apples' }, { label: 'bananas' }],
  question: 'Favourite fruit?',
  required: false,
  taskKey: 'T2',
  type: 'multiple'
}

export default WorkflowFactory.build({
  display_name: 'A test workflow',
  first_task: 'T0',
  tasks: {
    T0: singleChoiceTask,
    T1: multipleChoiceTask,
    T2: alternativeTask
  },
  version: '0.0'
})