import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'

import DataImageViewerContainer from './DataImageViewerContainer'
import DataImageViewerConnector from './DataImageViewerConnector'
import ImageToolbar from '../../../ImageToolbar'
import SubjectViewerStore from '@store/SubjectViewerStore'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const subject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/kepler.json'
    },
    { 'image/png': 'https://panoptes-uploads.zooniverse.org/production/subject_location/6379335f-d893-445d-a25e-c14b83eabf63.png' }
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

const stories = storiesOf('Subject Viewers | DataImageViewer', module)

stories.addDecorator(withKnobs)
// stories.addParameters({ viewport: { defaultViewport: 'responsive' } })

const { colors } = zooTheme.global

stories
  .add('light theme', () => {
    return (
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
        themeMode='light'
      >
        <Box height='500px' width='large'>
          <DataImageViewerContainer
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={darkZooTheme}
        themeMode='dark'
      >
        <Box height='500px' width='large'>
          <DataImageViewerContainer
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, { backgrounds: backgrounds.darkDefault, viewport: { defaultViewport: 'responsive' }, ...config })
  .add('narrow view', () => {
    return (
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
        themeMode='light'
      >
        <Box height='500px' width='large'>
          <DataImageViewerContainer
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })
  .add('pan / zoom', () => {
    return (
      <ViewerContext mode='light' theme={zooTheme}>
        <Box direction='row' height='500px' width='large'>
          <DataImageViewerConnector />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)