import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import ImageAndTextViewerConnector from './ImageAndTextViewerConnector'

export default {
  title: 'Subject Viewers / ImageAndTextViewer',
  component: ImageAndTextViewerConnector,
  args: {
    dark: false,
    loadingState: asyncStates.success
  },
  argTypes: {
    loadingState: {
      options: Object.values(asyncStates),
      type: 'select'
    }
  }
}

const subjectSnapshot = SubjectFactory.build({
  id: '1234',
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/72823751-8222-403c-a4cc-8e365f880dfb.jpeg'
    },
    {
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    }
  ]
})

const textLocationFirstSubjectSnapshot = SubjectFactory.build({
  id: '5678',
  locations: [
    {
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    },
    {
      'image/jpeg': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/72823751-8222-403c-a4cc-8e365f880dfb.jpeg'
    }
  ]
})

const store = mockStore({
  subject: subjectSnapshot
})

const storeWithSubjectTextLocationFirst = mockStore({
  subject: textLocationFirstSubjectSnapshot
})

export function Default ({
  dark,
  loadingState
}) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider classifierStore={store}>
        <Box height='500px' width='large'>
          <ImageAndTextViewerConnector
            loadingState={loadingState}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export function TextLocationFirst ({
  dark,
  loadingState
}) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider classifierStore={storeWithSubjectTextLocationFirst}>
        <Box height='500px' width='large'>
          <ImageAndTextViewerConnector
            loadingState={loadingState}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}
