import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { Provider } from 'mobx-react'

import ImageToolbar from '../../../ImageToolbar'

import mockStore from '@test/mockStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'

import SingleImageViewerContainer from './SingleImageViewerContainer'

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
  title: 'Subject Viewers / SingleImageViewer',
  component: SingleImageViewerContainer
}

export function Default() {
  return (
    <ViewerContext store={store}>
      <Box width='large'>
        <SingleImageViewerContainer
          loadingState={asyncStates.success}
          title={{
            id: '1234',
            text: 'Subject 1234'
          }}
        />
      </Box>
    </ViewerContext>
  )
}

export function PanAndZoom() {
  return (
    <ViewerContext store={store}>
      <Box direction='row' width='large'>
      <SingleImageViewerContainer loadingState={asyncStates.success} />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

export function Error() {
  return (
    <ViewerContext store={store}>
      <Box width='large'>
        <SingleImageViewerContainer loadingState={asyncStates.error} />
      </Box>
    </ViewerContext>
  )
}

export function Loading() {
  return (
    <ViewerContext store={store}>
      <Box width='large'>
        <SingleImageViewerContainer loadingState={asyncStates.loading} />
      </Box>
    </ViewerContext>
  )
}
