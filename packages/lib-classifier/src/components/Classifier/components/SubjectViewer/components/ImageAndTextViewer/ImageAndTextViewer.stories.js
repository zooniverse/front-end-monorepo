import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SubjectViewer from '../../SubjectViewer'

export default {
  title: 'Subject Viewers / ImageAndTextViewer',
  component: SubjectViewer,
  args: {
    dark: false
  }
}

const subjectSnapshot = SubjectFactory.build({
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

export function Default ({ dark }) {
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
          <SubjectViewer />
        </Box>
      </Provider>
    </Grommet>
  )
}
