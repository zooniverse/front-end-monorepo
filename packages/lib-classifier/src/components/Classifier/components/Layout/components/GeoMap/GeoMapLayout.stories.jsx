import mockStore from '@test/mockStore'
import { Provider } from 'mobx-react'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import GeoMapLayout from './GeoMapLayout'

const mockTasks = {
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

const workflowMock = {
  configuration: {
    subject_viewer: 'geoMap',
  },
  first_task: 'init',
  steps: [],
  strings: {},
  tasks: mockTasks
}

Object.entries(workflowMock.tasks).forEach(([taskKey, task]) => {
  if (task.strings) {
    const taskEntries = Object.entries(task.strings)
    taskEntries.forEach(([key, value]) => {
      const translationKey = `tasks.${taskKey}.${key}`
      workflowMock.strings[translationKey] = value
    })
  }
})

const store = mockStore({
  project: ProjectFactory.build({
    experimental_tools: ['mapping']
  }),
  subject: SubjectFactory.build({
    id: 'mock_subject',
    locations: [
      { 'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/d995c06b-0e46-4e0b-8102-0aec7964b61c.txt' }
    ]
  }),
  workflow: WorkflowFactory.build(workflowMock)
})

export default {
  title: 'Layouts / GeoMap',
  component: GeoMapLayout,
}

export function Default() {
  return (
    <Provider classifierStore={store}>
      <GeoMapLayout />
    </Provider>
  )
}
