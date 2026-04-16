import { Box } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'

import SingleAudioViewerContainer from './SingleAudioViewerContainer'

const subject = Factory.build('subject', {
  locations: [
    {
      'audio/mpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/da142085-ad60-4243-8f14-46f181b778e4.mpga'
    }
  ]
})

const store = mockStore({
  subject: subject
})

export default {
  title: 'Subject Viewers / SingleAudioViewer',
  component: SingleAudioViewerContainer
}

export const Default = () => {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <SingleAudioViewerContainer
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
        <SingleAudioViewerContainer />
      </Box>
    </Provider>
  )
}
