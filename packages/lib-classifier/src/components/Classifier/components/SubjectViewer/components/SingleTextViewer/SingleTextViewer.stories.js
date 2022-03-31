import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import { Factory } from 'rosie'

import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleTextViewer from '@viewers/components/SingleTextViewer'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewer,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

const subject = Factory.build('subject', {
  content: 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"',
  contentLoadingState: asyncStates.success
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setModalVisibility: () => {}
  },
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const LightTheme = () => {
  return (
    <Provider classifierStore={mockStore}>
      <Grommet
        background={background}
        theme={zooTheme}
        themeMode='light'
      >
        <Box height='500px' width='large'>
          <SingleTextViewer />
        </Box>
      </Grommet>
    </Provider>
  )
}

export const DarkTheme = () => {
  return (
    <Provider classifierStore={mockStore}>
      <Grommet
        background={background}
        theme={zooTheme}
        themeMode='dark'
      >
        <Box height='500px' width='large'>
          <SingleTextViewer />
        </Box>
      </Grommet>
    </Provider>
  )
}
