import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import DataImageViewer from './index.js'
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
  workflows: {
    active: {}
  },
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

const { colors } = zooTheme.global

export default {
  title: 'Subject Viewers / DataImageViewer',
  component: DataImageViewer
}

export function LightTheme() {
  return (
    <ViewerContext mode='light' theme={zooTheme}>
      <Box width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
      </Box>
    </ViewerContext>
  )
}

LightTheme.story = {
  name: 'light theme',
  parameters: config,
}

export function DarkTheme() {
  const darkZooTheme = { ...zooTheme, dark: true }
  return (
    <ViewerContext mode='dark' theme={zooTheme}>
      <Box width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
      </Box>
    </ViewerContext>
  )
}

DarkTheme.story = {
  name: 'dark theme',
  parameters: {
    backgrounds: backgrounds.darkDefault,
    viewport: {
      defaultViewport: 'responsive'
    },
    ...config
  }
}

export function NarrowView() {
  return (
    <ViewerContext mode='light' theme={zooTheme}>
      <Box width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
      </Box>
    </ViewerContext>
  )
}

NarrowView.story = {
  name: 'narrow view',
  parameters: {
    viewport: {
      defaultViewport: 'iphone5'
    },
    ...config
  }
}

export function PanZoom() {
  return (
    <ViewerContext mode='light' theme={zooTheme}>
      <Box direction='row' width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}

PanZoom.story = {
  name: 'pan / zoom',
  parameters: config
}
