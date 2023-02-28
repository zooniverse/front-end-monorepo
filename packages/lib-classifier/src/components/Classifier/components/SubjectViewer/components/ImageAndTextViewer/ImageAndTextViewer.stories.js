import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import ImageAndTextViewer from './'

export default {
  title: 'Subject Viewers / ImageAndTextViewer',
  component: ImageAndTextViewer,
  args: {
    dark: false,
    loadingState: asyncStates.success
  },
  argTypes: {
    loadingState: {
      type: 'select',
      options: Object.keys(asyncStates)
    }
  }
}

const subjectSnapshot = SubjectFactory.build({
  content: `
    AMHERST COLLEGE HERBARIUM
    No.
    Name Potamogeton gemmiparus Robbins
    Locality barter
    Donor Addison Brown LLP:
    Amherst College 1852
  `,
  contentLoadingState: asyncStates.success,
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/72823751-8222-403c-a4cc-8e365f880dfb.jpeg'
    },
    {
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    }
  ]
})

const store = mockStore({
  subject: subjectSnapshot
})

const textLocationFirstSubjectSnapshot = SubjectFactory.build({
  content: `
    AMHERST COLLEGE HERBARIUM
    No.
    Name Potamogeton gemmiparus Robbins
    Locality barter
    Donor Addison Brown LLP:
    Amherst College 1852
  `,
  contentLoadingState: asyncStates.success,
  locations: [
    {
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    },
    {
      'image/jpeg': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/72823751-8222-403c-a4cc-8e365f880dfb.jpeg'
    }
  ]
})

const textLocationFirstStore = mockStore({
  subject: textLocationFirstSubjectSnapshot
})

export const Default = ({ dark, loadingState }) => {
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
        <Box width='large'>
          <ImageAndTextViewer
            subject={store.subjects.active}
            loadingState={loadingState}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export const TextLocationFirst = ({ dark, loadingState }) => {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Provider classifierStore={textLocationFirstStore}>
        <Box width='large'>
          <ImageAndTextViewer
            subject={textLocationFirstStore.subjects.active}
            loadingState={loadingState}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}
