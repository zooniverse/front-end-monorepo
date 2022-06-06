import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import ImageToolbar from './ImageToolbar'

import SingleImageViewer from '../SubjectViewer/components/SingleImageViewer'

export default {
  title: 'Image Toolbar / Image Toolbar',
  component: ImageToolbar,
  args: {
    dark: false
  }
}

const subjectSnapshot = SubjectFactory.build({
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
    }
  ]
})

const workflowSnapshot = WorkflowFactory.build({
  configuration: {
    invert_subject: true
  }
})

const store = mockStore({
  subject: subjectSnapshot,
  workflow: workflowSnapshot
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
      <Provider
        classifierStore={store}
      >
        <Box
          direction='row'
          height='800px'
          width='large'
        >
          <SingleImageViewer
            loadingState={asyncStates.success}
            subject={store.subjects.active}
          />
          <ImageToolbar />
        </Box>
      </Provider>
    </Grommet>
  )
}
