import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { PanZoomProvider } from '@plugins/drawingTools/shared/PanZoomContext'
import DataImageViewer from './index.js'
import ImageToolbar from '../../../ImageToolbar'
import SubjectViewerStore from '@store/SubjectViewerStore'
import mockStore from '@test/mockStore'
import readme from './README.md'

const subject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/kepler.json'
    },
    { 'image/png': 'https://panoptes-uploads.zooniverse.org/production/subject_location/6379335f-d893-445d-a25e-c14b83eabf63.png' }
  ]
})

const lasairSubject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/ede79cbf-5b44-453a-8e5b-49dea5cf510b.json'
    },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/67b54e54-8ca9-4cb7-a4fb-2417b5bfc82a.jpeg' }
  ]
})

function ViewerContext ({
  children,
  store = mockStore({ subject })
}) {
  return (
    <Provider classifierStore={store}>
      <PanZoomProvider>
        {children}
      </PanZoomProvider>
    </Provider>
  )
}

export default {
  title: 'Subject Viewers / DataImageViewer',
  component: DataImageViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default() {
  return (
    <ViewerContext>
      <Box width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
      </Box>
    </ViewerContext>
  )
}

export function NarrowView() {
  return (
    <ViewerContext>
      <Box width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
      </Box>
    </ViewerContext>
  )
}

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function PanZoom() {
  return (
    <ViewerContext>
      <Box direction='row' width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

export function InvertYAxis() {
  const lasairMock = mockStore({ subject: lasairSubject })

  return (
    <ViewerContext store={lasairMock}>
      <Box direction='row' width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
