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
    barJSON,
    focusedSeries,
    imageSrc,
    invertYAxis,
    periodMultiple,
    phasedJSON,
    phaseLimit,
    rawJSON: {
      scatterPlot
    },
    setPeriodMultiple,
    setSeriesFocus,
    setYAxisInversion,
    theme
  } = props

  const underlays = [
    { fill: theme.global.colors['light-3'], startPosition: -phaseLimit, xAxisWidth: phaseLimit },
    { fill: theme.global.colors['light-3'], startPosition: 1, xAxisWidth: phaseLimit }
  ]

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
        data={scatterPlot.data}
        focusedSeries={focusedSeries}
        gridArea='controls'
        periodMultiple={periodMultiple}
        setPeriodMultiple={setPeriodMultiple}
        setSeriesFocus={setSeriesFocus}
        setYAxisInversion={setYAxisInversion}
        theme={theme}
      />
      <Box
        gridArea='phasedJSON'
      >
        <ScatterPlotViewer
          data={phasedJSON.data}
          focusedSeries={focusedSeries}
          invertAxes={{ x: false, y: invertYAxis }}
          underlays={underlays}
          xAxisLabel={counterpart('VariableStarViewer.phase')}
          xAxisNumTicks={8}
          yAxisLabel={phasedJSON.chartOptions.yAxisLabel}
          yAxisNumTicks={8}
        />
      </Box>
      <Box
        gridArea='rawJSON'
      >
        <ScatterPlotViewer
          data={scatterPlot.data}
          focusedSeries={focusedSeries}
          invertAxes={{ x: false, y: invertYAxis }}
          xAxisLabel={scatterPlot.chartOptions.xAxisLabel}
          xAxisNumTicks={4}
          yAxisLabel={scatterPlot.chartOptions.yAxisLabel}
          yAxisNumTicks={6}
        />
      </Box>
      <Box
        background='#ffffff'
        direction='row'
        gap='small'
        gridArea='barCharts'
        pad='small'
      >
      {barJSON.map((barChart) => {
        return (
          <BarChartViewer
            key={`${barChart.chartOptions.yAxisLabel} vs ${barChart.chartOptions.xAxisLabel}`}
            data={barChart.data}
            xAxisLabel={barChart.chartOptions.xAxisLabel}
            yAxisLabel={barChart.chartOptions.yAxisLabel}
          />
        )
      })}
      </Box>
      <Box
        as='figure'
        direction='column'
        height='260px'
        gridArea='HRDiagram'
        margin='none'
        width='220px'
      >
        <SingleImageViewer
          aria-labelledby='imageId'
          height={230}
          enableInteractionLayer={false}
          role='img'
          viewBox='0 0 220 260'
          width={220}
        >
          <title id='imageId'>{counterpart('VariableStarViewer.imageTitle')}</title>
          <image height={230} xlinkHref={imageSrc} width={220} />
        </SingleImageViewer>
        <figcaption>
          <SpacedText color='dark-5' weight='bold'>&#8592; {counterpart('VariableStarViewer.temperature')}</SpacedText>
        </figcaption>
      </Box>
    </Grid>
  )
})

VariableStarViewer.defaultProps = {
  barJSON: [
    {
      data: [],
      chartOptions: {
        xAxisLabel: '',
        yAxisLabel: ''
      } 
    }
  ],
  focusedSeries: [],
  imageSrc: '',
  invertYAxis: false,
  periodMultiple: 1,
  phasedJSON: {
    data: [],
    chartOptions: {}
  },
  rawJSON: {
    scatterPlot: {
      data: [],
      chartOptions: {}
    },
    barCharts: []
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
  barJSON: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    })
  ),
  focusedSeries: PropTypes.arrayOf(PropTypes.object),
  imageSrc: PropTypes.string,
  invertYAxis: PropTypes.bool,
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

export default withTheme(VariableStarViewer)
export { VariableStarViewer }