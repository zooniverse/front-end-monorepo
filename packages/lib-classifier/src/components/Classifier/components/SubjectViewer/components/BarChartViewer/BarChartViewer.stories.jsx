import { Box, Grommet, base as baseTheme } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData, {
  mockDataWithColor,
  variableStarAmplitudeMockData,
  variableStarPeriodMockData
} from './mockData'
import { merge } from 'lodash'
import readme from './README.md'

export default {
  title: 'Subject Viewers / BarChartViewer',
  component: BarChartViewer,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => {
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel }
  } = mockData
  return (
    <Box background='white' height='medium' pad='small' width='large'>
      <BarChartViewer
        data={data}
        margin={margin}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
      />
    </Box>
  )
}

export const CustomThemeAndBarColor = () => {
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel }
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
      <Box background='#fff' height='medium' pad='small' width='large'>
        <BarChartViewer
          data={data}
          margin={margin}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      </Box>
    </Grommet>
  )
}

export const VariableStarPeriodBarCharts = () => {
  return (
    <Box
      background='#ffffff'
      direction='row'
      height='300px'
      gap='small'
      pad='small'
      width='300px'
    >
      <BarChartViewer
        data={variableStarPeriodMockData.data}
        margin={variableStarPeriodMockData.chartOptions.margin}
        xAxisLabel={variableStarPeriodMockData.chartOptions.xAxisLabel}
        yAxisLabel={variableStarPeriodMockData.chartOptions.yAxisLabel}
      />
      <BarChartViewer
        data={variableStarAmplitudeMockData.data}
        margin={variableStarAmplitudeMockData.chartOptions.margin}
        xAxisLabel={variableStarAmplitudeMockData.chartOptions.xAxisLabel}
        yAxisLabel={variableStarAmplitudeMockData.chartOptions.yAxisLabel}
      />
    </Box>
  )
}
