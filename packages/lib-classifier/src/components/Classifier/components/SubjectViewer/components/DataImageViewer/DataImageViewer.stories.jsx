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
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/17a17a16-ed3d-40a8-b775-e65db6c4b852.json',
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/71cca7c9-4ba1-48c6-a2b1-4f32f9a89ec6.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/0943b4a1-175f-4cf0-beaf-1a02cff05fed.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/67b54e54-8ca9-4cb7-a4fb-2417b5bfc82a.jpeg'
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