import { Box } from 'grommet'
import { Provider } from 'mobx-react'

import ImageToolbar from '../../../ImageToolbar'

import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'

import NewSingleImageViewerConnector from './'

const subject = SubjectFactory.build({
  locations: [{ 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg' }]
})

const workflow = WorkflowFactory.build({
  configuration: {
    invert_subject: true
  }
})

const store = mockStore({ subject, workflow })

const ViewerContext = ({ store, children }) => {
  return <Provider classifierStore={store}>{children}</Provider>
}

export default {
  title: 'Subject Viewers / NewSingleImageViewer',
  component: NewSingleImageViewerConnector
}

export function Default() {
  return (
    <ViewerContext store={store}>
      <Box width='large'>
        <NewSingleImageViewerConnector />
      </Box>
    </ViewerContext>
  )
}

export function PanAndZoom() {
  return (
    <ViewerContext store={store}>
      <Box direction='row' width='large'>
        <NewSingleImageViewerConnector />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
