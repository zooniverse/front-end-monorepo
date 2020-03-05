import React from 'react'
import sinon from 'sinon'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import ClusterOfSubjectsViewer, { ClusterOfSubjectsViewerContainer } from './ClusterOfSubjectsViewerContainer'
import ZoomInButton from '../../../ImageToolbar/components/ZoomInButton/ZoomInButton'
import ZoomOutButton from '../../../ImageToolbar/components/ZoomOutButton/ZoomOutButton'
import ResetButton from '../../../ImageToolbar/components/ResetButton/ResetButton'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const subject = {
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
}

let zoomCallback

function onZoom(type) {
  zoomCallback(type)
}

function setZoomCallback(callback) {
  zoomCallback = callback
}

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  drawing: {
    addToStream: sinon.stub()
  },
  subjectViewer: {
    enableRotation: () => null,
    setOnZoom: setZoomCallback
  },
  workflowSteps: {
    activeStepTasks: []
  }
}


function ViewerContext (props) {
  const { children, theme } = props
  return (
    <Provider classifierStore={mockStore}>
      <Grommet theme={theme}>
        {children}
      </Grommet>
    </Provider>
  )
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

storiesOf('Subject Viewers | ClusterOfSubjectsViewer', module)
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ClusterOfSubjectsViewer
            enableInteractionLayer={false}
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box height='medium' width='large'>
          <ClusterOfSubjectsViewer
            enableInteractionLayer={false}
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
  .add('pan and zoom', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box height='medium' width='large'>
          <ClusterOfSubjectsViewer
            subject={subject}
          />
        </Box>
        <Box direction='row'>
          <ZoomInButton onClick={() => onZoom('zoomin')} />
          <ZoomOutButton onClick={() => onZoom('zoomout')} />
          <ResetButton onClick={() => onZoom('zoomto')} />
        </Box>
      </ViewerContext>
    )
  }, config)
