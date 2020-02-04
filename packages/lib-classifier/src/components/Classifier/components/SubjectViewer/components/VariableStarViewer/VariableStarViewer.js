import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import counterpart from 'counterpart'
import { SpacedText } from '@zooniverse/react-components'
import ScatterPlotViewer from '../ScatterPlotViewer'
import { SingleImageViewer } from '../SingleImageViewer'
import { BarChartViewer } from '../BarChartViewer'
import Controls from './components/Controls'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const VariableStarViewer = React.forwardRef(function VariableStarViewer(props, ref) {
  const {
    barJSON: {
      amplitude,
      period
    },
    imgSrc,
    periodMultiple,
    phasedJSON,
    rawJSON,
    setPeriodMultiple,
    setSeriesFocus,
    setYAxisInversion
  } = props

  return (
    <Grid
      forwardedRef={ref}
      rows={['1fr', '1fr', '1fr']}
      columns={['2fr', '1fr']}
      gap='xsmall'
      areas={[
        { name: 'controls', start: [0, 0], end: [0, 0] },
        { name: 'phasedJSON', start: [0, 1], end: [1, 1] },
        { name: 'rawJSON', start: [0, 2], end: [1, 2] },
        { name: 'barCharts', start: [2, 0], end: [2, 0] },
        { name: 'HRDiagram', start: [2, 1], end: [2, 2] }
      ]}
    >
      <Controls
        gridArea='controls'
        periodMultiple={periodMultiple}
        setPeriodMultiple={setPeriodMultiple}
        setSeriesFocus={setSeriesFocus}
        setYAxisInversion={setYAxisInversion}
      />
      <Box gridArea='phasedJSON'>
        <ScatterPlotViewer
          data={phasedJSON.data}
          xAxisLabel={counterpart('VariableStarViewer.phase')}
          yAxisLabel={phasedJSON.chartOptions.yAxisLabel}
        />
      </Box>
      <Box gridArea='rawData'>
        <ScatterPlotViewer
          data={rawJSON.data}
          xAxisLabel={rawJSON.chartOptions.xAxisLabel}
          yAxisLabel={rawJSON.chartOptions.yAxisLabel}
        />
      </Box>
      <Box gridArea='barCharts'>
        <BarChartViewer
          data={period.data}
          xAxisLabel={period.options.xAxisLabel}
          yAxisLabel={period.options.yAxisLabel}
        />
        <BarChartViewer
          data={amplitude.data}
          xAxisLabel={amplitude.options.xAxisLabel}
          yAxisLabel={amplitude.options.yAxisLabel}
        />
      </Box>
      <Box gridArea='HRDiagram'>
        <SingleImageViewer>
          <image src={imgSrc} />
        </SingleImageViewer>
        <SpacedText>{counterpart('VariableStarViewer.temperature')}</SpacedText>
      </Box>
    </Grid>
  )
})

VariableStarViewer.defaultProps = {
  periodMultiple: 1,
  phasedJSON: {
    data: [],
    chartOptions: {}
  },
  setPeriodMultiple: () => { },
  setSeriesFocus: () => { },
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  zooming: false
}

VariableStarViewer.propTypes = {
  theme: PropTypes.object,
  zooming: PropTypes.bool
}

export default VariableStarViewer