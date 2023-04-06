import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Factory } from 'rosie'
import VariableStarViewer from './VariableStarViewerContainer'
import VariableStarViewerConnector from './VariableStarViewerConnector'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ImageToolbar from '../../../ImageToolbar'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import asyncStates from '@zooniverse/async-states'

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

export default {
  title: 'Subject Viewers / VariableStarViewer',
  component: VariableStarViewer,
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
    <ViewerContext theme={zooTheme} mode='light'>
      <Box height='640px' width={{ max: '900px' }}>
        <VariableStarViewer
          loadingState={asyncStates.success}
          subject={subject}
        />
      </Box>
    </ViewerContext>
  )
}

export function DarkTheme() {
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
}

DarkTheme.parameters = {
  backgrounds: backgrounds.darkDefault
}

export function NarrowView() {
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
}

NarrowView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function PanZoom() {
  return (
    <ViewerContext theme={zooTheme} mode='light'>
      <Box direction='row' height='640px' width={{ max: '900px' }}>
        <VariableStarViewerConnector
          loadingState={asyncStates.success}
        />
        <ImageToolbar width='4rem' />
      </Box>
    </ViewerContext>
  )
}
