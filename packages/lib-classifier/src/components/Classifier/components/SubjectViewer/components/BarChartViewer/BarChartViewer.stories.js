import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet, base as baseTheme } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData, { mockDataWithColor } from './mockData'
import { merge } from 'lodash'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const stories = storiesOf('BarChartViewer', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
    const {
      data,
      options: {
        xAxisLabel,
        xAxisMargin,
        yAxisLabel,
        yAxisMargin
      }
    } = mockData
    return (
      <Grommet theme={zooTheme}>
        <Box
          background={text('container background', 'white')}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            data={data}
            xAxisLabel={text('x axis label', xAxisLabel)}
            xAxisMargin={number('x axis margin', xAxisMargin)}
            yAxisLabel={text('y axis label', yAxisLabel)}
            yAxisMargin={number('y axis margin', yAxisMargin)}
          />
        </Box>
      </Grommet>
    )
  }, config)
  .add('dark theme', () => {
    const {
      data,
      options: {
        xAxisLabel,
        xAxisMargin,
        yAxisLabel,
        yAxisMargin
      }
    } = mockData
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box
          background={text('container background', darkZooTheme.global.colors['dark-3'])}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            data={data}
            xAxisLabel={text('x axis label', xAxisLabel)}
            xAxisMargin={number('x axis margin', xAxisMargin)}
            yAxisLabel={text('y axis label', yAxisLabel)}
            yAxisMargin={number('y axis margin', yAxisMargin)}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
  .add('Custom theme and bar color', () => {
    const {
      data,
      options: {
        xAxisLabel,
        xAxisMargin,
        yAxisLabel,
        yAxisMargin
      }
    } = mockDataWithColor
    const customTheme = merge({}, baseTheme, {
      global: {
        font: {
          family: 'Bitstream Vera Serif'
        }
      }
    })
    return (
      <Grommet theme={customTheme}>
        <Box
          background={text('container background', '#ffffff')}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            data={data}
            xAxisLabel={text('x axis label', xAxisLabel)}
            xAxisMargin={number('x axis margin', xAxisMargin)}
            yAxisLabel={text('y axis label', yAxisLabel)}
            yAxisMargin={number('y axis margin', yAxisMargin)}
          />
        </Box>
      </Grommet>
    )
  }, config)
