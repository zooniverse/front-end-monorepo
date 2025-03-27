import { WorkflowFactory } from '@test/factories'

/* 
  An example workflow created by the new workflow editor, 
  which includes steps in the editor interface. This workflow is
  non-branching, has three steps with one task each, all required.
*/

const singleChoiceTask = {
  answers: [
    { label: 'yes', next: 'P1' },
    { label: 'no', next: 'P1' }
  ],
  help: '',
  question: 'Is there a cat?',
  required: true,
  type: 'single'
}

const multipleChoiceTask = {
  answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
  help: '',
  question: 'What is/are the cat(s) doing?',
  required: true,
  type: 'multiple'
}

const finalSingleChoiceTask = {
  answers: [{ label: 'oranges' }, { label: 'apples' }],
  help: '',
  question: 'Favorite fruit?',
  required: true,
  type: 'single'
}

const mockWorkflow = WorkflowFactory.build({
  display_name: 'Multi-step workflow',
  tasks: {
    T0: singleChoiceTask,
    T1: multipleChoiceTask,
    T2: finalSingleChoiceTask
  },
  steps: [
    ['P0', { stepKey: 'P0', taskKeys: ['T0'] }],
    ['P1', { next: 'P2', stepKey: 'P1', taskKeys: ['T1'] }],
    ['P2', { stepKey: 'P2', taskKeys: ['T2'] }]
  ]
})

export default mockWorkflow
