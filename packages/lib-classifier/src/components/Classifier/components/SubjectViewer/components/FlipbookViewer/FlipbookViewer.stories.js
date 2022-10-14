import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory } from '@test/factories'
import asyncStates from '@zooniverse/async-states'

import FlipbookViewer from './FlipbookViewer'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const subject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/098f3fb6-5021-410a-82a2-477a28b2bcd6.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/8fcb18b0-de80-42cd-ba2a-4871da30c74f.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/85d8d82a-c88d-493c-b3db-7cd9f2ca5ad8.jpeg'
    }
  ],
  metadata: {
    default_frame: 0
  }
})

const store = mockStore({
  subject: subject
})

export default {
  title: 'Subject Viewers / FlipbookViewer',
  component: FlipbookViewer,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <Box height='500px' width='large'>
          <FlipbookViewer
            loadingState={asyncStates.success}
            subject={store.subjects.active}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}
