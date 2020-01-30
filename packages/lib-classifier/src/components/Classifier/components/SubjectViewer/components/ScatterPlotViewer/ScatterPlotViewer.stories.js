import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { darken } from 'polished'
import { withKnobs, boolean, text, number, object } from '@storybook/addon-knobs'
import ScatterPlotViewer from './ScatterPlotViewer'
import ZoomInButton from '../../../ImageToolbar/components/ZoomInButton/ZoomInButton'
import ZoomOutButton from '../../../ImageToolbar/components/ZoomOutButton/ZoomOutButton'
import ResetButton from '../../../ImageToolbar/components/ResetButton/ResetButton'

import {
  keplerMockDataWithOptions,
  lightCurveMockData,
  randomSingleSeriesData
} from './helpers/mockData'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const { data } = randomSingleSeriesData

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

const { colors } = zooTheme.global

stories
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={object('data', data)}
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
            data={object('data', data)}
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
            data={object('data', data)}
            panning={boolean('panning', false)}
            xAxisLabel={text('x axis label', 'x-axis')}
            yAxisLabel={text('y axis label', 'y-axis')}
            zooming={boolean('zooming', false)}
          />
        </Box>
      </Grommet>
    )
  }, { viewport: { defaultViewport: 'iphone5' }, ...config })
  .add('data with x (horizontal) error bars', () => {
    function constructData () {
      return [...Array(10)].map((number, index) => {
        const coords = {
          x: Math.floor(Math.random() * 10) + 1,
          y: Math.floor(Math.random() * 10) + 1,
        }

        if (index % 2 == 0) coords.x_error = Math.random()
        return coords
      })
    }

    const data = [{
      seriesData: constructData(),
      seriesOptions: {
        label: 'data'
      }
    }]

    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={object('data', data)}
            panning={boolean('panning', true)}
            setOnZoom={setZoomCallback}
            xAxisLabel={text('x axis label', 'x-axis')}
            yAxisLabel={text('y axis label', 'y-axis')}
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
  })
  .add('kepler light curve data with inner facing axes', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            axisColor={text('axis color', colors['light-1'])}
            backgroundColor={text('background color', darken(0.08, colors['neutral-2']))}
            data={object('data', keplerMockDataWithOptions.data)}
            glyphColors={[colors['light-1']]}
            margin={keplerMockDataWithOptions.chartOptions.margin}
            padding={keplerMockDataWithOptions.chartOptions.padding}
            panning={boolean('panning', false)}
            setOnZoom={setZoomCallback}
            tickDirection='inner'
            xAxisLabel={text('x axis label', keplerMockDataWithOptions.chartOptions.xAxisLabel)}
            yAxisLabel={text('y axis label', keplerMockDataWithOptions.chartOptions.yAxisLabel)}
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
            data={object('data', keplerMockDataWithOptions.data)}
            panning={boolean('panning', true)}
            setOnZoom={setZoomCallback}
            xAxisLabel={text('x axis label', keplerMockDataWithOptions.chartOptions.xAxisLabel)}
            yAxisLabel={text('y axis label', keplerMockDataWithOptions.chartOptions.yAxisLabel)}
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
  .add('variable star light curve data (multiple series) with y (vertical) direction error bars', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <ScatterPlotViewer
            data={object('data', lightCurveMockData.variableStar.data)}
            panning={boolean('panning', true)}
            setOnZoom={setZoomCallback}
            xAxisLabel={text('x axis label', 'phase')}
            yAxisLabel={text('y axis label', 'brightness')}
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