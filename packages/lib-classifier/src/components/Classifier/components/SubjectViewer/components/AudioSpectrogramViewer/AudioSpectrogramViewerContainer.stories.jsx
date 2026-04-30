import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'

import AudioSpectrogramViewerContainer from './AudioSpectrogramViewerContainer'

const subject = Factory.build('subject', {
  locations: [
    {
      'audio/mpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/48f9e6b4-1d87-4df1-9dab-d2e95bbebda7.mpga'
    },
    {
      'image/png':
        'https://panoptes-uploads.zooniverse.org/subject_location/bb4ca61e-167c-4fe9-904c-1c49777f4efe.png'
    }
  ]
})

const store = mockStore({
  subject: subject
})

export default {
  title: 'Subject Viewers / AudioSpectrogramViewer',
  component: AudioSpectrogramViewerContainer
}

export const Default = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <AudioSpectrogramViewerContainer
          loadingState='success'
          subject={store.subjects.active}
        />
      </Box>
    </Provider>
  )
}

export const NoSubject = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <AudioSpectrogramViewerContainer />
      </Box>
    </Provider>
  )
}
