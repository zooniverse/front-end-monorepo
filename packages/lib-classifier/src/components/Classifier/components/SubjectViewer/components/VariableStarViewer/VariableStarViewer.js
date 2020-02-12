import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import {
  Box,
  Grid
} from 'grommet'
import counterpart from 'counterpart'
import { SpacedText } from '@zooniverse/react-components'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
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
      fill
      rows={['60px', '1/4', '1/4', '1/4']}
      columns={['2/3', '1/3']}
      gap='xsmall'
      areas={[
        { name: 'controls', start: [0, 0], end: [0, 0] },
        { name: 'phasedJSON', start: [0, 1], end: [0, 2] },
        { name: 'rawJSON', start: [0, 3], end: [0, 3] },
        { name: 'barCharts', start: [1, 0], end: [1, 1] },
        { name: 'HRDiagram', start: [1, 2], end: [1, 3] }
      ]}
    >
      <Controls
        gridArea='controls'
        periodMultiple={periodMultiple}
        setPeriodMultiple={setPeriodMultiple}
        setSeriesFocus={setSeriesFocus}
        setYAxisInversion={setYAxisInversion}
      />
      <Box
        gridArea='phasedJSON'
      >
        <ScatterPlotViewer
          data={phasedJSON.data}
          xAxisLabel={counterpart('VariableStarViewer.phase')}
          yAxisLabel={phasedJSON.chartOptions.yAxisLabel}
        />
      </Box>
      <Box
        gridArea='rawJSON'
      >
        <ScatterPlotViewer
          data={rawJSON.data}
          xAxisLabel={rawJSON.chartOptions.xAxisLabel}
          yAxisLabel={rawJSON.chartOptions.yAxisLabel}
        />
      </Box>
      <Box
        background='#ffffff'
        direction='row'
        gap='small'
        gridArea='barCharts'
        pad='small'
      >
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
      <Box
        direction='column'
        height='260px'
        gridArea='HRDiagram'
        width='220px'
      >
        <SingleImageViewer
          height={260}
          enableInteractionLayer={false}
          viewBox='0 0 220 260'
          width={220}
        >
          <image height={260} src={imgSrc} width={220} />
        </SingleImageViewer>
        <SpacedText>{counterpart('VariableStarViewer.temperature')}</SpacedText>
      </Box>
    </Grid>
  )
})

VariableStarViewer.defaultProps = {
  barJSON: {
    amplitude: {
      data: [],
      options: {} 
    },
    period: {
      data: [],
      options: {}
    }
  },
  imgSrc: '',
  periodMultiple: 1,
  phasedJSON: {
    data: [],
    chartOptions: {}
  },
  rawJSON: {
    data: [],
    chartOptions: {}
  },
  setPeriodMultiple: () => { },
  setSeriesFocus: () => { },
  setYAxisInversion: () => {},
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  zooming: false
}

VariableStarViewer.propTypes = {
  barJSON: PropTypes.shape({
    amplitude: PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    }),
    period: PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    })
  }),
  imgSrc: PropTypes.string,
  periodMultiple: PropTypes.number,
  phasedJSON: PropTypes.shape({
    data: PropTypes.array,
    chartOptions: PropTypes.object
  }),
  rawJSON: PropTypes.shape({
    data: PropTypes.array,
    chartOptions: PropTypes.object
  }),
  setPeriodMultiple: PropTypes.func,
  setSeriesFocus: PropTypes.func,
  setYAxisInversion: PropTypes.func,
  theme: PropTypes.object,
  zooming: PropTypes.bool
}

export default VariableStarViewer