import { Provider } from 'mobx-react'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import CenteredLayout from './CenteredLayout'

export default {
  title: 'Layouts / Centered',
  component: CenteredLayout,
  excludeStories: ['mockTasks'],
  args: {
    separateFramesView: false
  }
}

const subjectSnapshot = SubjectFactory.build({
  id: '1',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
    }
  ]
})

export const mockTasks = {
  init: {
    answers: [{ label: 'yes' }, { label: 'no' }],
    strings: {
      help: 'Choose an answer from the choices given, then press Done.',
      question: 'Is there a cat?',
      'answers.0.label': 'yes',
      'answers.1.label': 'no'
    },
    taskKey: 'init',
    type: 'single'
  }
}

const taskStrings = {}
const tasksEntries = Object.entries(mockTasks)
tasksEntries.forEach(([taskKey, task]) => {
  if (task.strings) {
    const taskEntries = Object.entries(task.strings)
    taskEntries.forEach(([key, value]) => {
      const translationKey = `tasks.${taskKey}.${key}`
      taskStrings[translationKey] = value
    })
  }
})

const workflowSnapshot = WorkflowFactory.build({
  configuration: {
    invert_subject: true,
    limit_subject_height: true
  },
  first_task: 'init',
  strings: taskStrings,
  tasks: mockTasks
})

export function Default({ separateFramesView }) {
  return (
    <Provider classifierStore={Default.store}>
      <CenteredLayout separateFramesView={separateFramesView} />
    </Provider>
  )
}

Default.store = mockStore({
  subject: subjectSnapshot,
  workflow: workflowSnapshot
})
