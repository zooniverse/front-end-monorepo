import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Factory } from 'rosie'

import SingleVideoViewerContainer from './'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

// Can't use { SubjectFactory } from '@test/factories because video locations isn't handled yet
const subject = Factory.build('subject', {
  locations: [
    {
      'video/mp4': 'https://panoptes-uploads.zooniverse.org/subject_location/239f17f7-acf9-49f1-9873-266a80d29c33.mp4'
    }
  ]
})

export default {
  title: 'Subject Viewers / SingleVideoViewer',
  component: SingleVideoViewerContainer,
  args: {
    enableInteractionLayer: false,
    dark: false,
    onError: () => {},
    onReady: () => {},
    onKeyDown: () => {}
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export const Default = ({
  enableInteractionLayer,
  dark,
  onError,
  onReady
}) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Box width='large'>
        <SingleVideoViewerContainer
          enableInteractionLayer={enableInteractionLayer}
          loadingState='success'
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      </Box>
    </Grommet>
  )
}

export const Loading = ({
  enableInteractionLayer,
  dark,
  onError,
  onReady
}) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Box width='large'>
        <SingleVideoViewerContainer
          enableInteractionLayer={enableInteractionLayer}
          loadingState='loading'
          onError={onError}
          onReady={onReady}
          subject={subject}
        />
      </Box>
    </Grommet>
  )
}

export const NoSubject = ({
  enableInteractionLayer,
  dark,
  onError,
  onReady
}) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Box width='large'>
        <SingleVideoViewerContainer
          enableInteractionLayer={enableInteractionLayer}
          loadingState='error'
          onError={onError}
          onReady={onReady}
        />
      </Box>
    </Grommet>
  )
}
