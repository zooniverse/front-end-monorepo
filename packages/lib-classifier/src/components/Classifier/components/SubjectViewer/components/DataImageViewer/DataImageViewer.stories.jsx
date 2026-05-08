import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import DataImageViewer from './'
import ImageToolbar from '../../../ImageToolbar'
import mockStore from '@test/mockStore'
import readme from './README.md'

// Simple Subject contains 1 JSON file and 1 image file
const simpleSubject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/main/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/kepler.json'
    },
    { 'image/png': 'https://panoptes-uploads.zooniverse.org/production/subject_location/6379335f-d893-445d-a25e-c14b83eabf63.png' }
  ]
})

// Multi Image Subject contains 1 JSON file and 3 images file
const multiImageSubject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/0e939261-5e70-4be2-b168-8c4b34321fb3.json',
    },
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/a704707d-9afe-4451-b505-d99b5cd2e2dc.png'
    },
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/fbc390b4-054e-449f-b068-0aa54df9bb9d.png'
    },
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/46d7d9ec-79ec-4ecc-8e71-9fa2a240a3b7.png'
    }
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
  store = mockStore({ subject: simpleSubject })
}) {
  return (
    <Provider classifierStore={store}>
      {children}
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

export function MultiImageSubjects() {
  const multiImageMock = mockStore({ subject: multiImageSubject })

  return (
    <ViewerContext store={multiImageMock}>
      <Box direction='row' width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}