import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { Provider } from 'mobx-react'

import ImageToolbar from '../../../ImageToolbar'
import { subject } from './constants'

import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

import SingleImageViewerContainer from './SingleImageViewerContainer'

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
            id: 'subject-title',
            text: `Subject ${subject.id}`
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
