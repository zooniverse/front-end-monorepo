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
import readme from '../LightCurveViewer/README.md'
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

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const stories = storiesOf('ScatterPlotViewer', module)

stories.addDecorator(withKnobs)

stories
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='384px' width='768px'>
          <ScatterPlotViewer
            data={mockData}
            panning={boolean('panning', false)}
            setOnZoom={setZoomCallback}
            zooming={boolean('zooming', false)}
            zoomConfiguration={{
              direction: text('zoom direction', 'x'),
              minZoom: 1,
              maxZoom: 10,
              zoomInValue: 1.2,
              zoomOutValue: 0.8
            }}
          />
          <Box direction='row'>
            <ZoomInButton onClick={() => onZoom('zoomin')} />
            <ZoomOutButton onClick={() => onZoom('zoomout')} />
            <ResetButton onClick={() => onZoom('zoomto')} />
          </Box>
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
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
