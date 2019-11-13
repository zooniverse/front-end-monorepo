import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import ScatterPlotViewer from './ScatterPlotViewer'
import ZoomInButton from '../../../ImageToolbar/components/ZoomInButton/ZoomInButton'
import ZoomOutButton from '../../../ImageToolbar/components/ZoomOutButton/ZoomOutButton'
import ResetButton from '../../../ImageToolbar/components/ResetButton/ResetButton'

import {
  data,
  lightCurveMockData
} from './helpers/mockData'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

let zoomCallback

function onZoom (type) {
  zoomCallback(type)
}

function setZoomCallback (callback) {
  zoomCallback = callback
}

const stories = storiesOf('Subject Viewers | ScatterPlotViewer', module)

stories.addDecorator(withKnobs)
stories.addParameters({ viewport: { defaultViewport: 'responsive' } })

stories
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={data}
            panning={boolean('panning', false)}
            xAxisLabel={text('x axis label', 'x-axis')}
            yAxisLabel={text('y axis label', 'y-axis')}
            zooming={boolean('zooming', false)}
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
          <ScatterPlotViewer
            data={data}
            panning={boolean('panning', false)}
            xAxisLabel={text('x axis label', 'x-axis')}
            yAxisLabel={text('y axis label', 'y-axis')}
            zooming={boolean('zooming', false)}
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
          <ScatterPlotViewer
            data={data}
            panning={boolean('panning', false)}
            xAxisLabel={text('x axis label', 'x-axis')}
            yAxisLabel={text('y axis label', 'y-axis')}
            zooming={boolean('zooming', false)}
          />
        </Box>
      </Grommet>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })
  .add('light curve data with inner facing axes', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={lightCurveMockData.data}
            margin={lightCurveMockData.options.margin}
            padding={lightCurveMockData.options.padding}
            panning={boolean('panning', false)}
            setOnZoom={setZoomCallback}
            tickDirection='inner'
            xAxisLabel={text('x axis label', lightCurveMockData.options.xAxisLabel)}
            yAxisLabel={text('y axis label', lightCurveMockData.options.yAxisLabel)}
            zooming={boolean('zooming', false)}
            zoomConfiguration={{
              direction: text('zoom direction', 'both'),
              minZoom: number('min zoom', 1),
              maxZoom: number('max zoom', 10),
              zoomInValue: number('zoom in scale', 1.2),
              zoomOutValue: number('zoom out scale', 0.8)
            }}
          />
        </Box>
      </Grommet>
    )
  }, config)
  .add('pan and zoom', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={lightCurveMockData.data}
            panning={boolean('panning', true)}
            setOnZoom={setZoomCallback}
            xAxisLabel={text('x axis label', lightCurveMockData.options.xAxisLabel)}
            yAxisLabel={text('y axis label', lightCurveMockData.options.yAxisLabel)}
            zooming={boolean('zooming', true)}
            zoomConfiguration={{
              direction: text('zoom direction', 'both'),
              minZoom: number('min zoom', 1),
              maxZoom: number('max zoom', 10),
              zoomInValue: number('zoom in scale', 1.2),
              zoomOutValue: number('zoom out scale', 0.8)
            }}
          />
        </Box>
        <Box direction='row'>
          <ZoomInButton onClick={() => onZoom('zoomin')} />
          <ZoomOutButton onClick={() => onZoom('zoomout')} />
          <ResetButton onClick={() => onZoom('zoomto')} />
        </Box>
      </Grommet>
    )
  }, config)
