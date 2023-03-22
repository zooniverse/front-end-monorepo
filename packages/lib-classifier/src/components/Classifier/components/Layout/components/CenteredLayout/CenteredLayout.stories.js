import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import CenteredLayout from './CenteredLayout'

export default {
  title: 'Layouts / Centered',
  component: CenteredLayout,
  excludeStories: ['mockTask'],
  args: {
    dark: false
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

export const mockTask = {
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
Object.entries(mockTask).forEach(([taskKey, task]) => {
  if (task.strings) {
    Object.entries(task.strings).forEach(([key, value]) => {
      taskStrings[`tasks.${taskKey}.${key}`] = value
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
  tasks: mockTask
})

export function Default({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider classifierStore={Default.store}>
        <CenteredLayout />
      </Provider>
    </Grommet>
  )
}
Default.store = mockStore({
  subject: subjectSnapshot,
  workflow: workflowSnapshot
})
