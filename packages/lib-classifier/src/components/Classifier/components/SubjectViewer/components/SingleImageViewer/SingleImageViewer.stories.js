import React from 'react'
import sinon from 'sinon'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleImageViewer, { SingleImageViewerContainer } from './SingleImageViewerContainer'
import { AnnotateButton, MoveButton, ResetButton, RotateButton, ZoomInButton, ZoomOutButton } from '../../../ImageToolbar/components/'
import withKeyZoom from '../../../withKeyZoom'
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

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  drawing: {
    addToStream: sinon.stub()
  },
  subjectViewer: SubjectViewerStore.create({}),
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

storiesOf('Subject Viewers | SingleImageViewer', module)
  .add('light theme', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box height='medium' width='large'>
          <SingleImageViewer
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext theme={darkZooTheme}>
        <Box height='medium' width='large'>
          <SingleImageViewer
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, darkThemeConfig)
  .add('with zoom controls', () => {
    const Toolbar = withKeyZoom(Box)
    return (
      <ViewerContext theme={zooTheme}>
        <Toolbar direction='row'>
          <AnnotateButton />
          <MoveButton />
          <ZoomInButton />
          <ZoomOutButton />
          <RotateButton />
          <ResetButton />
        </Toolbar>
        <Box height='medium' width='large'>
          <SingleImageViewer
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
