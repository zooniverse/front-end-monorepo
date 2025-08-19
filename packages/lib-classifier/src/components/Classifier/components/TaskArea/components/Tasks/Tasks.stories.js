import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { Box } from 'grommet'

import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'

import TasksConnector from './TasksConnector'

export default {
  title: 'Tasks / General',
  component: TasksConnector
}

// export function Loading() {
//   return (
//     <MockTask
//       loadingState={asyncStates.loading}
//     />
//   )
// }

// export function Error() {
//   return (
//     <MockTask
//       loadingState={asyncStates.error}
//     />
//   )
// }

const singleChoiceTask = {
  answers: [
    { label: 'yes', next: 'P1' },
    { label: 'no', next: 'P1' }
  ],
  question: 'Yes or No?',
  required: true,
  type: 'single'
}

const multipleChoiceTask = {
  answers: [{ label: 'Jimin' }, { label: 'Jungkook' }, { label: 'j-hope' }],
  question: 'Who is your favorite member of BTS?',
  required: true,
  type: 'multiple'
}

const workflowStrings = {
  'tasks.T0.answers.0.label': 'Yes',
  'tasks.T0.answers.1.label': 'No',
  'tasks.T0.help':
    'Choose an answer from the choices given, then press Done. This is help text from the first task.',
  'tasks.T0.question': 'Yes or No?',
  'tasks.T1.answers.0.label': 'Jimin',
  'tasks.T1.answers.1.label': 'Jungkook',
  'tasks.T1.answers.2.label': 'j-hope',
  'tasks.T1.help':
    'Pick as many answers as apply, then press Done. This is help text of the second task.',
  'tasks.T1.question': 'Who is your favorite member of BTS?'
}

/*
  Build a mock workflow that has one step and two tasks in that step.
  We're manually adding strings to the workflow object because normally
  there are API requests to /translations and the returned translations strings
  are attached to the workflow store in ClassifierContainer.
*/
const mockWorkflow = WorkflowFactory.build({
  display_name: 'Multi-task step',
  tasks: {
    T0: singleChoiceTask,
    T1: multipleChoiceTask
  },
  steps: [['S0', { stepKey: 'S0', taskKeys: ['T0', 'T1'] }]]
})

/* Create a very simple subject */
const mockSubject = SubjectFactory.build()

/* Init the mock store */
const mockedStore = mockStore({ subject: mockSubject, workflow: mockWorkflow })

/*
  This is what happens in ClassifierContainer and provides the labels to the
  task's questions, answers, and help text.
*/
const storedWorkflow = mockedStore.workflows.resources.get(mockWorkflow.id)
applySnapshot(storedWorkflow.strings, workflowStrings)

/* Subject viewer must be ready for the task area to be interactive */
const { subjectViewer } = mockedStore
subjectViewer.onSubjectReady()

export function MultipleTasks() {
  return (
    <Provider classifierStore={mockedStore}>
      <Box
        width='25rem'
        pad='medium'
        margin='medium'
        border={{ style: 'solid', color: { dark: 'white', light: 'light-3' } }}
        background={{ light: 'white'}}
      >
        <TasksConnector />
      </Box>
    </Provider>
  )
}
