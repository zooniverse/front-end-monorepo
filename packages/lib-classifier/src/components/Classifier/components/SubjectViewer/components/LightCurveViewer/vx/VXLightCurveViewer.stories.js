import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import * as d3 from 'd3'
import { zip } from 'lodash'
import VXLightCurveViewer from './VXLightCurveViewer'
import mockData from '../mockData'
import readme from '../README.md'
import backgrounds from '../../../../../../../../.storybook/lib/backgrounds'

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

storiesOf('VXLightCurveViewer', module)
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='384px' width='768px'>
          <VXLightCurveViewer
            dataExtent={dataExtent}
            dataPoints={dataPoints}
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
          <VXLightCurveViewer
            dataExtent={dataExtent}
            dataPoints={dataPoints}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
