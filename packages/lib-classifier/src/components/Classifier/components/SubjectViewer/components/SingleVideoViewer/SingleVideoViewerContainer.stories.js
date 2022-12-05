import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import { WorkflowFactory } from '@test/factories'

import SingleVideoViewerContainer from './'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const subject = Factory.build('subject', {
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/239f17f7-acf9-49f1-9873-266a80d29c33.mp4'
    }
  ]
})

const drawingWorkflow = WorkflowFactory.build({
  display_name: 'Video Drawing Task',
  first_task: 'T0',
  tasks: {
    T0: {
      help: '',
      instruction: 'Draw on the video',
      tools: [
        {
          color: '#000000',
          label: 'Mock Tool',
          type: 'ellipse'
        }
      ],
      type: 'drawing'
    }
  }
})

const noDrawingStore = mockStore({
  subject: subject
})

const drawingStore = mockStore({
  subject: subject,
  workflow: drawingWorkflow
})

export default {
  title: 'Subject Viewers / SingleVideoViewer',
  component: SingleVideoViewerContainer,
  args: {
    dark: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export const Default = ({ dark, onError, onReady }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={noDrawingStore}>
        <Box width='large'>
          <SingleVideoViewerContainer
            loadingState='success'
            onError={onError}
            onReady={onReady}
            subject={subject}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export const WithDrawingEnabled = ({ dark, onError, onReady }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={drawingStore}>
        <Box width='large'>
          <SingleVideoViewerContainer
            loadingState='success'
            onError={onError}
            onReady={onReady}
            subject={subject}
          />
        </Box>
      </Provider>
    </Grommet>
  )
}

export const NoSubject = ({ dark, onError, onReady }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Box width='large'>
        <SingleVideoViewerContainer onError={onError} onReady={onReady} />
      </Box>
    </Grommet>
  )
}
