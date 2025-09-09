import mockStore from '@test/mockStore'
import { Provider } from 'mobx-react'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import VolumetricLayout from './VolumetricLayout'

const workflowMock = {
  configuration: {},
  first_task: 'T0',
  strings: {},
  tasks: {
    T0: {
      strings: {
        instruction: 'Annotate subject with a volumetric annotation',
      },
      taskKey: 'T0',
      type: 'volumetric'
    }
  }
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
    experimental_tools: ['volumetricProject']
  }),
  subject: SubjectFactory.build({
    id: 'mock_subject',
    locations: [
      { 'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/34898ede-7e3d-4f83-b6ee-920769f01288.json' }
    ]
  }),
  workflow: WorkflowFactory.build(workflowMock)
})

export default {
  title: 'Layouts / Volumetric',
  component: VolumetricLayout,
}

export function Default() {
  return (
    <Provider classifierStore={store}>
      <VolumetricLayout />
    </Provider>
  )
}
