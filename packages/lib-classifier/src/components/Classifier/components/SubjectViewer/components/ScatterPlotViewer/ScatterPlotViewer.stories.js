import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import ScatterPlotViewer from './ScatterPlotViewer'
import ZoomInButton from '../../../ImageToolbar/components/ZoomInButton/ZoomInButton'
import ZoomOutButton from '../../../ImageToolbar/components/ZoomOutButton/ZoomOutButton'
import ResetButton from '../../../ImageToolbar/components/ResetButton/ResetButton'
import mockData from '../LightCurveViewer/mockData'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const transformMatrixMock = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
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
            data={mockData}
            panning={boolean('panning', false)}
            parentHeight={384}
            parentWidth={768}
            transformMatrix={transformMatrixMock}
            xAxisLabel={text('x axis label', 'Days')}
            yAxisLabel={text('y axis label', 'Brightness')}
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
            data={mockData}
            panning={boolean('panning', false)}
            parentHeight={384}
            parentWidth={768}
            transformMatrix={transformMatrixMock}
            xAxisLabel={text('x axis label', 'Days')}
            yAxisLabel={text('y axis label', 'Brightness')}
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
            data={mockData}
            panning={boolean('panning', false)}
            parentHeight={384}
            parentWidth={768}
            transformMatrix={transformMatrixMock}
            xAxisLabel={text('x axis label', 'Days')}
            yAxisLabel={text('y axis label', 'Brightness')}
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
            data={mockData}
            panning={boolean('panning', false)}
            parentHeight={384}
            parentWidth={768}
            setOnZoom={setZoomCallback}
            tickDirection={text('tick direction', 'inner')}
            transformMatrix={transformMatrixMock}
            xAxisLabel={text('x axis label', 'Days')}
            yAxisLabel={text('y axis label', 'Brightness')}
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
            data={mockData}
            panning={boolean('panning', false)}
            parentHeight={384}
            parentWidth={768}
            setOnZoom={setZoomCallback}
            transformMatrix={transformMatrixMock}
            xAxisLabel={text('x axis label', 'Days')}
            yAxisLabel={text('y axis label', 'Brightness')}
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
        <Box direction='row'>
          <ZoomInButton onClick={() => onZoom('zoomin')} />
          <ZoomOutButton onClick={() => onZoom('zoomout')} />
          <ResetButton onClick={() => onZoom('zoomto')} />
        </Box>
      </Grommet>
    )
  }, config)