import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import * as d3 from 'd3'
import { zip } from 'lodash'
import LightCurveViewer from './LightCurveViewer'
import { kepler as mockData } from '../../helpers/mockLightCurves/kepler'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const dataPoints = zip(mockData.x, mockData.y)
const dataExtent = {
  x: d3.extent(mockData.x),
  y: d3.extent(mockData.y)
}

storiesOf('Subject Viewers | LightCurveViewer', module)
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <LightCurveViewer
            dataExtent={dataExtent}
            dataPoints={dataPoints}
            setOnPan={() => { }}
            setOnZoom={() => { }}
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
          <LightCurveViewer
            dataExtent={dataExtent}
            dataPoints={dataPoints}
            setOnPan={() => { }}
            setOnZoom={() => { }}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
