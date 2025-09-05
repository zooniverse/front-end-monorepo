import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import {
  DrawingTaskFactory,
  SubjectFactory,
  UPPFactory,
  WorkflowFactory
} from '@test/factories'
import mockStore from '@test/mockStore'

import MetaTools from './MetaTools'

export default {
  title: 'Meta Tools / MetaToolsContainer',
  component: MetaTools
}

const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    }
  ],
  metadata: {
    time: 'Morning',
    location: 'United States'
  }
})

const mockWorkflow = WorkflowFactory.build({
  tasks: {
    T0: DrawingTaskFactory.build()
  }
})

const upp = UPPFactory.build()

const store = mockStore({
  subject: mockSubject,
  workflow: mockWorkflow
})

store.userProjectPreferences.setUPP(upp)

export const Default = () => {
  return (
    <Provider classifierStore={store}>
      <MetaTools />
    </Provider>
  )
}

export const SmallSubjectViewer = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='300px'>
        <MetaTools />
      </Box>
    </Provider>
  )
}
