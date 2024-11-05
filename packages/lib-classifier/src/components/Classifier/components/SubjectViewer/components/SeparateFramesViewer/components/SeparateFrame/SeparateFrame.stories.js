import { Provider } from 'mobx-react'

import { PanZoomProvider } from '@plugins/drawingTools/shared/PanZoomContext'
import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

import SeparateFrame from './SeparateFrame'

export default {
  title: 'Subject Viewers / SeparateFramesViewer / SeparateFrame',
  component: SeparateFrame,
  args: {
    frameUrl:
      'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg',
    limitSubjectHeight: false
  }
}

const workflowSnapshot = WorkflowFactory.build({
  configuration: {
    invert_subject: true
  }
})

const store = mockStore({
  workflow: workflowSnapshot
})
store.subjectViewer.setSeparateFramesView(true)
store.subjectViewer.enableRotation(true)

export const Default = ({ frameUrl, limitSubjectHeight }) => {
  return (
    <Provider classifierStore={store}>
      <PanZoomProvider>
        <SeparateFrame
          frameUrl={frameUrl}
          limitSubjectHeight={limitSubjectHeight}
        />
      </PanZoomProvider>
    </Provider>
  )
}
