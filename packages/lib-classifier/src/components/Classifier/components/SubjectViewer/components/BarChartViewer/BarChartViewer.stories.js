import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, object } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet, base as baseTheme } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData, {
  mockDataWithColor,
  variableStarAmplitudeMockData,
  variableStarPeriodMockData
} from './mockData'
import { merge } from 'lodash'
import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  notes: {
    markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const stories = storiesOf('Subject Viewers | BarChartViewer', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
  const {
    data,
    options: {
      margin,
      xAxisLabel,
      yAxisLabel,
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
          data={object('data', data)}
          margin={{
            bottom: number('bottom margin', margin.bottom),
            left: number('left margin', margin.left),
            right: number('right margin', margin.right),
            top: number('top margin', margin.top)
          }}
          xAxisLabel={text('x axis label', xAxisLabel)}
          yAxisLabel={text('y axis label', yAxisLabel)}
        />
      </Box>
    </Grommet>
  )
}, config)
  .add('dark theme', () => {
    const {
      data,
      options: {
        margin,
        xAxisLabel,
        yAxisLabel
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
            margin={margin}
            xAxisLabel={text('x axis label', xAxisLabel)}
            yAxisLabel={text('y axis label', yAxisLabel)}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
  .add('Custom theme and bar color', () => {
    const {
      data,
      options: {
        margin,
        xAxisLabel,
        yAxisLabel
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
            margin={margin}
            xAxisLabel={text('x axis label', xAxisLabel)}
            yAxisLabel={text('y axis label', yAxisLabel)}
          />
        </Box>
      </Grommet>
    )
  }, config)
  .add('Variable Star Period bar charts', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box
          background={text('container background', '#ffffff')}
          direction='row'
          height={text('parent container height', '300px')}
          gap='small'
          pad='small'
          width={text('parent container width', '300px')}
        >
          <BarChartViewer
            data={object('period data', variableStarPeriodMockData.data)}
            margin={{
              bottom: number('period bottom margin', variableStarPeriodMockData.options.margin.bottom),
              left: number('period left margin', variableStarPeriodMockData.options.margin.left),
              right: number('period right margin', variableStarPeriodMockData.options.margin.right),
              top: number('period top margin', variableStarPeriodMockData.options.margin.top)
            }}
            xAxisLabel={text('period x-axis label', variableStarPeriodMockData.options.xAxisLabel)}
            yAxisLabel={text('period y-axis label', variableStarPeriodMockData.options.yAxisLabel)}
          />
          <BarChartViewer
            data={object('amplitude data', variableStarAmplitudeMockData.data)}
            margin={{
              bottom: number('amplitude bottom margin', variableStarAmplitudeMockData.options.margin.bottom),
              left: number('amplitude left margin', variableStarAmplitudeMockData.options.margin.left),
              right: number('amplitude right margin', variableStarAmplitudeMockData.options.margin.right),
              top: number('amplitude top margin', variableStarAmplitudeMockData.options.margin.top)
            }}
            xAxisLabel={text('amplitude x-axis label', variableStarAmplitudeMockData.options.xAxisLabel)}
            yAxisLabel={text('amplitude y-axis label', variableStarAmplitudeMockData.options.yAxisLabel)}
          />
        </Box>
      </Grommet>
    )
  }, config)
