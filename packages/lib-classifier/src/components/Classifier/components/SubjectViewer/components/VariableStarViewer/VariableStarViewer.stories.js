import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs'
import { Factory } from 'rosie'
import VariableStarViewer from './VariableStarViewerContainer'
import VariableStarViewerConnector from './VariableStarViewerConnector'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ImageToolbar from '../../../ImageToolbar'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import asyncStates from '@zooniverse/async-states'

const config = {
  notes: {
    markdown: readme
  }
}

const stories = storiesOf('Subject Viewers / VariableStarViewer', module)
  .addDecorator(withKnobs)
  .addParameters({
    component: VariableStarViewer,
    viewPort: {
      defaultViewport: 'responsive'
    }
  })

const { colors } = zooTheme.global

const subject = Factory.build('subject', {
  locations: [
    {
      'image/png': 'talkfallback.png'
    },
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/variableStar.json'
    },
    { 'image/png': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/VariableStarViewer/mocks/temperature.png' }
  ]
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {},
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  }
}


function ViewerContext (props) {
  const { children, theme, mode } = props
  return (
    <Provider classifierStore={mockStore}>
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={theme}
        themeMode={mode}
      >
        {children}
      </Grommet>
    </Provider>
  )
}

stories
  .add('light theme', () => {
    return (
      <ViewerContext theme={zooTheme} mode='light'>
        <Box height='640px' width={{ max: '900px' }}>
          <VariableStarViewer
            loadingState={asyncStates.success}
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <ViewerContext theme={darkZooTheme} mode='dark'>
        <Box height='640px' width={{ max: '900px' }}>
          <VariableStarViewer
            loadingState={asyncStates.success}
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, { backgrounds: backgrounds.darkDefault, viewport: { defaultViewport: 'responsive' }, ...config })
  .add('narrow view', () => {
    return (
      <ViewerContext theme={zooTheme} mode='light'>
        <Box height='640px' width={{ max: '900px' }}>
          <VariableStarViewer
            loadingState={asyncStates.success}
            subject={subject}
          />
        </Box>
      </ViewerContext>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })
  .add('pan/zoom', () => {
    return (
      <ViewerContext theme={zooTheme} mode='light'>
        <Box direction='row' height='640px' width={{ max: '900px' }}>
          <VariableStarViewerConnector
            loadingState={asyncStates.success}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)