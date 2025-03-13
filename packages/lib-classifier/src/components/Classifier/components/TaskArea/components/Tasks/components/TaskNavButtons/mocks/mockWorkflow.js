import { WorkflowFactory } from '@test/factories'

const singleChoiceTask = {
  answers: [{ label: 'yes' }, { label: 'no' }],
  question: 'Is there a cat?',
  required: true,
  taskKey: 'T0',
  type: 'single'
}
const multipleChoiceTask = {
  answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
  question: 'What is/are the cat(s) doing?',
  required: true,
  taskKey: 'T1',
  type: 'multiple'
}
const finalSingleChoiceTask = {
  answers: [{ label: 'oranges' }, { label: 'apples' }],
  question: 'Favourite fruit?',
  required: true,
  taskKey: 'T2',
  type: 'single'
}

const mockWorkflow = WorkflowFactory.build({
  display_name: 'Multi-step workflow',
  first_task: 'T0',
  tasks: {
    T0: singleChoiceTask,
    T1: multipleChoiceTask,
    T2: finalSingleChoiceTask
  },
  version: '0.0'
})

export const workflowStrings = {
  display_name: 'Multi-step workflow',
  'tasks.T0.question': 'Is there a cat?',
  'tasks.T0.answers.0.label': 'yes',
  'tasks.T0.answers.1.label': 'no',
  'tasks.T1.question': 'What is/are the cats doing?',
  'tasks.T1.answers.0.label': 'napping',
  'tasks.T1.answers.1.label': 'standing',
  'tasks.T1.answers.2.label': 'playing',
  'tasks.T2.question': 'Favourite fruit?',
  'tasks.T2.answers.0.label': 'oranges',
  'tasks.T2.answers.1.label': 'apples'
}

export default mockWorkflow
