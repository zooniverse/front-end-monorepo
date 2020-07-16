import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs'
import { Factory } from 'rosie'
import VariableStarViewer, { VariableStarViewerContainer } from './VariableStarViewerContainer'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ImageToolbar from '../../../ImageToolbar'
import {
  variableStarAmplitudeMockData,
  variableStarPeriodMockData
} from '../BarChartViewer/mockData'
import variableStar from '../../helpers/mockLightCurves/variableStar'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import image from './mocks/temperature.png'

const config = {
  notes: {
    markdown: readme
  }
}

let zoomCallback

function onZoom(type) {
  zoomCallback(type)
}

function setZoomCallback(callback) {
  zoomCallback = callback
}

const stories = storiesOf('Subject Viewers | VariableStarViewer', module)

stories.addDecorator(withKnobs)
// stories.addParameters({ viewport: { defaultViewport: 'responsive' } })

const { colors } = zooTheme.global


const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {},
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

const subject = Factory.build('subject', {
  locations: [
    {
      'application/json': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/mockLightCurves/variableStar.json'
    },
    { 'image/png': 'https://raw.githubusercontent.com/zooniverse/front-end-monorepo/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/VariableStarViewer/mocks/temperature.png' }
  ]
})

stories
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='500px' width='700px'>
          <VariableStarViewerContainer
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
        <Box height='500px' width='large'>
          <VariableStarViewerContainer
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, { backgrounds: backgrounds.darkDefault, viewport: { defaultViewport: 'responsive' }, ...config })
  .add('narrow view', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box height='500px' width='large'>
          <VariableStarViewerContainer
            subject={subject}
          />
        </Box>
      </Grommet>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })
  .add('pan/zoom', () => {
    return (
      <ViewerContext theme={zooTheme}>
        <Box direction='row' height='500px' width='large'>
          <VariableStarViewer
            subject={subject}
          />
          <ImageToolbar />
        </Box>
      </ViewerContext>
    )
  }, config)