import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import SeparateFramesViewer from './SeparateFramesViewer'

export default {
  title: 'Subject Viewers / SeparateFramesViewer',
  component: SeparateFramesViewer
}

const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/098f3fb6-5021-410a-82a2-477a28b2bcd6.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/8fcb18b0-de80-42cd-ba2a-4871da30c74f.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/85d8d82a-c88d-493c-b3db-7cd9f2ca5ad8.jpeg'
    }
  ]
})

const store = mockStore({
  subject: mockSubject
})
store.subjectViewer.setSeparateFramesView(true)

export const OneColumn = () => {
  return (
    <Provider classifierStore={store}>
      <SeparateFramesViewer
        loadingState={asyncStates.success}
        subject={store.subjects.active}
      />
    </Provider>
  )
}
