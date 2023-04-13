import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewerConnector,
  args: {
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
      'text/plain':
        'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    }
  ]
})

const store = mockStore({
  subject: subjectSnapshot
})

export function Default({ loadingState }) {
  return (
    <Provider classifierStore={store}>
      <Box width='large'>
        <SingleTextViewerConnector loadingState={loadingState} />
      </Box>
    </Provider>
  )
}
