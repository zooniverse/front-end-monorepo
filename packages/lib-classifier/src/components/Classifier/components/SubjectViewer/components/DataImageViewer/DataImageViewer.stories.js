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

const subject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/kepler.json'
    },
    { 'image/png': 'https://panoptes-uploads.zooniverse.org/production/subject_location/6379335f-d893-445d-a25e-c14b83eabf63.png' }
  ]
})

const lasairSubject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/718e46ec-c752-436f-9bb6-b6fdf6ba7bc7.json'
    },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/67b54e54-8ca9-4cb7-a4fb-2417b5bfc82a.jpeg' }
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

function ViewerContext ({
  children,
  mode,
  store = mockStore,
  theme
}) {
  return (
    <Provider classifierStore={store}>
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

export default {
  title: 'Subject Viewers / DataImageViewer',
  component: DataImageViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
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

export function DarkTheme() {
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

DarkTheme.parameters = {
  backgrounds: backgrounds.darkDefault
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

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
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

export function InvertYAxis() {
  const lasairMock = {
    ...mockStore,
    subjects: {
      active: lasairSubject
    }
  }

  return (
    <ViewerContext mode='light' store={lasairMock} theme={zooTheme}>
      <Box direction='row' width='large'>
        <DataImageViewer
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
