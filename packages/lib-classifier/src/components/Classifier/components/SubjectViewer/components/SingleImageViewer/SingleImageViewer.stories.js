import asyncStates from '@zooniverse/async-states'
import React from 'react'
import sinon from 'sinon'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import SingleImageViewer from './'
// import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

// TODO: add readme
const config = {
  notes: {
    // markdown: readme
  }
}

const subject = {
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
}

const mockStore = {
  drawing: {
    addToStream: sinon.stub()
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
