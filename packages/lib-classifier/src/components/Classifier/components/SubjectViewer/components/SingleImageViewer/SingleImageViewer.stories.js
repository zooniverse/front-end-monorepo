import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import asyncStates from '@zooniverse/async-states'

import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'

const subject = SubjectFactory.build({
  locations: [{ 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' }]
})

const workflow = WorkflowFactory.build('workflow', {
  configuration: {
    limit_subject_height: true
  }
})

export default {
  title: 'Subject Viewers / SingleImageViewer',
  component: SingleImageViewer
}

export function Default() {
  return (
    <Provider classifierStore={Default.store}>
      <Box width='large'>
        <SingleImageViewer
          loadingState={asyncStates.success}
          enableInteractionLayer={false}
        />
      </Box>
    </Provider>
  )
}
Default.store = mockStore({ subject })

export function LimitSubjectHeight() {
  return (
    <Provider classifierStore={LimitSubjectHeight.store}>
      <Box width='large'>
        <SingleImageViewer
          loadingState={asyncStates.success}
          enableInteractionLayer={false}
        />
      </Box>
    </Provider>
  )
}
LimitSubjectHeight.store = mockStore({ subject, workflow })
