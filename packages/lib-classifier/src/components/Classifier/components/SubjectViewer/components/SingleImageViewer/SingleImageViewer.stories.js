import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import ImageToolbar from '../../../ImageToolbar'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import asyncStates from '@zooniverse/async-states'

const config = {
  notes: {
    markdown: readme
  }
}

const subject = Factory.build('subject', {
  locations: [
    { 'image/jpeg': 'http://placekitten.com/500/300' }
  ]
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

storiesOf('Subject Viewers / SingleImageViewer', module)
  .addParameters({ component: SingleImageViewer })
  .add('light theme', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box height='500px' width='large'>
          <SingleImageViewer
            loadingState={asyncStates.success}
            enableInteractionLayer={false}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext theme={darkZooTheme}>
        <Box height='500px' width='large'>
          <SingleImageViewer
            loadingState={asyncStates.success}
            enableInteractionLayer={false}
          />
        </Box>
      </ViewerContext>
    )
  }, darkThemeConfig)
  .add('with zoom controls', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box direction='row' height='500px' width='large'>
          <SingleImageViewer
            loadingState={asyncStates.success}
            enableInteractionLayer={false}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)
