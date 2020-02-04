import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs'
import VariableStarViewer from './VariableStarViewer'
import ZoomInButton from '../../../ImageToolbar/components/ZoomInButton/ZoomInButton'
import ZoomOutButton from '../../../ImageToolbar/components/ZoomOutButton/ZoomOutButton'
import ResetButton from '../../../ImageToolbar/components/ResetButton/ResetButton'
import {
  variableStarAmplitudeMockData,
  variableStarPeriodMockData
} from '../BarChartViewer/mockData'
import {
  keplerMockDataWithOptions,
  lightCurveMockData,
} from '../ScatterPlotViewer/helpers/mockData'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

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
stories.addParameters({ viewport: { defaultViewport: 'responsive' } })

const { colors } = zooTheme.global

const barJSON = {
  amplitude: variableStarAmplitudeMockData,
  period: variableStarPeriodMockData
}

const image = 'https://placekitten.com/200/230'

stories
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <VariableStarViewer
            barJSON={barJSON}
            imgSrc={image}
            phasedJSON={{ data: [], chartOptions: {} }}
            rawJSON={object('data', data)}
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
          <VariableStarViewer
            barJSON={barJSON}
            imgSrc='https://placekitten.com/200/230'
            rawJSON={object('data', data)}
          />
        </Box>
      </Grommet>
    )
  }, { backgrounds: backgrounds.darkDefault, viewport: { defaultViewport: 'responsive' }, ...config })
  .add('narrow view', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box height='medium' width='large'>
          <VariableStarViewer
            barJSON={barJSON}
            imgSrc='https://placekitten.com/200/230'
            rawJSON={object('data', data)}
          />
        </Box>
      </Grommet>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })