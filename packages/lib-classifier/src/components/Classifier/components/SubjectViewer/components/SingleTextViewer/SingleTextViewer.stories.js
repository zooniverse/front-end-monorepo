import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'

const defaultContent = 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewerConnector,
  args: {
    content: defaultContent,
    contentLoadingState: asyncStates.success,
    dark: false
  },
  argTypes: {
    contentLoadingState: {
      control: {
        type: 'select'
      },
      options: Object.values(asyncStates)
    }
  }
}

const store = mockStore()

export function Default ({ content, contentLoadingState, dark }) {
  const subjectSnapshot = SubjectFactory.build({
    content,
    contentLoadingState,
    locations: [
      { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
    ]
  })

  store.subjects.setResources([subjectSnapshot])
  store.subjects.setActive(subjectSnapshot.id)

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
          <SingleTextViewerConnector />
        </Box>
      </Provider>
    </Grommet>
  )
}
