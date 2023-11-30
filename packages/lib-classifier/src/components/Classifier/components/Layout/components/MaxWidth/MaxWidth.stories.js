import { Provider } from 'mobx-react'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import MaxWidth from './MaxWidth'

export default {
  title: 'Layouts / Maximum Width',
  component: MaxWidth,
  excludeStories: ['mockTask'],
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
Object.entries(mockTasks).forEach(([taskKey, task]) => {
  if (task.strings) {
    Object.entries(task.strings).forEach(([key, value]) => {
      const taskKey = `tasks.${taskKey}.${key}`
      taskStrings[taskKey] = value
    })
  }
})

const workflowSnapshot = WorkflowFactory.build({
  configuration: {
    invert_subject: true
  },
  first_task: 'init',
  strings: taskStrings,
  tasks: mockTasks
})

export function Default({ separateFramesView }) {
  return (
    <Provider classifierStore={Default.store}>
      <MaxWidth separateFramesView={separateFramesView} />
    </Provider>
  )
}

Default.store = mockStore({
  subject: subjectSnapshot,
  workflow: workflowSnapshot
})
