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

const VariableStarViewer = React.forwardRef((props, ref) => {
  const {
    allowPanZoom,
    barJSON,
    imageSrc,
    invertYAxis,
    periodMultiple,
    phaseFocusedSeries,
    phasedJSON,
    phaseLimit,
    rawJSON: {
      data: {
        scatterPlot
      }
    },
    setAllowPanZoom,
    setOnPan,
    setOnZoom,
    setPeriodMultiple,
    setSeriesPhaseFocus,
    setSeriesVisibility,
    setYAxisInversion,
    theme,
    visibleSeries
  } = props

  const underlays = [
    { fill: (theme.dark) ? theme.global.colors['light-5'] : theme.global.colors['light-3'],
      startPosition: -phaseLimit,
      xAxisWidth: phaseLimit
    },
    { fill: (theme.dark) ? theme.global.colors['light-5'] : theme.global.colors['light-3'],
      startPosition: 1,
      xAxisWidth: phaseLimit
    }
  ]

  const zoomEnabled = {
    HRDiagram: allowPanZoom === 'HRDiagram',
    phasedJSON: allowPanZoom === 'phasedJSON',
    rawJSON: allowPanZoom === 'rawJSON'
  }

  return (
    <Grid
      ref={ref}
      fill
      rows={['80px', '1/4', '1/4', '150px']}
      columns={['2/3', '1/3']}
      gap='5px'
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
        gridArea='controls'
        periodMultiple={periodMultiple}
        phaseFocusedSeries={phaseFocusedSeries}
        setPeriodMultiple={setPeriodMultiple}
        setSeriesPhaseFocus={setSeriesPhaseFocus}
        setSeriesVisibility={setSeriesVisibility}
        setYAxisInversion={setYAxisInversion}
        theme={theme}
        visibleSeries={visibleSeries}
      />
      <Box
        border={zoomEnabled.phasedJSON && { color: 'brand', size: 'xsmall' }}
        gridArea='phasedJSON'
        style={{ position: 'relative' }}
      >
        <ScatterPlotViewer
          data={phasedJSON.data}
          invertAxes={{ x: false, y: invertYAxis }}
          margin={{
            bottom: 50,
            left: 60,
            right: 10,
            top: 30
          }}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          underlays={underlays}
          xAxisLabel={counterpart('VariableStarViewer.phase')}
          xAxisNumTicks={8}
          yAxisLabel={phasedJSON.chartOptions.yAxisLabel}
          yAxisNumTicks={8}
          visibleSeries={visibleSeries}
          zoomControlFn={(zoomEnabled.phasedJSON) ? () => setAllowPanZoom('') : () => setAllowPanZoom('phasedJSON')}
          zooming={zoomEnabled.phasedJSON}
        />
      </Box>
      <Box
        border={zoomEnabled.rawJSON && { color: 'brand', size: 'xsmall' }}
        gridArea='rawJSON'
        style={{ position: 'relative' }}
      >
        <ScatterPlotViewer
          data={scatterPlot.data}
          invertAxes={{ x: false, y: invertYAxis }}
          margin={{
            bottom: 50,
            left: 60,
            right: 10,
            top: 30
          }}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          xAxisLabel={scatterPlot.chartOptions.xAxisLabel}
          xAxisNumTicks={4}
          yAxisLabel={scatterPlot.chartOptions.yAxisLabel}
          yAxisNumTicks={6}
          visibleSeries={visibleSeries}
          zoomControlFn={(zoomEnabled.rawJSON) ? () => setAllowPanZoom('') : () => setAllowPanZoom('rawJSON')}
          zooming={zoomEnabled.rawJSON}
        />
      </Box>
      <Box
        background={{
          dark: 'dark-1',
          light: 'neutral-6'
        }}
        direction='row'
        gridArea='barCharts'
        margin={{ bottom: 'xsmall' }}
        pad='none'
      >{Object.keys(barJSON).map((barChartKey) => {
        //Let's keep the rendering of the bar chart flexible in case more plots are added in the future
        return (
          <BarChartViewer
            data={barJSON[barChartKey].data}
            key={barChartKey}
            xAxisLabel={barJSON[barChartKey].chartOptions.xAxisLabel}
            yAxisLabel={barJSON[barChartKey].chartOptions.yAxisLabel}
          />
        )})}
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
          <SpacedText color={{ light: 'dark-5', dark: 'light-1' }} weight='bold'>&#8592; {counterpart('VariableStarViewer.temperature')}</SpacedText>
        </figcaption>
      </Box>
    </Grid>
  )
})

VariableStarViewer.defaultProps = {
  allowPanZoom: '',
  barJSON: {
    amplitude: {
      data: [],
      chartOptions: {}
    },
    period: {
      data: [],
      chartOptions: {}
    }
  },
  imageSrc: '',
  invertYAxis: false,
  periodMultiple: 1,
  phaseFocusedSeries: 0,
  phasedJSON: {
    data: [],
    chartOptions: {}
  },
  rawJSON: {
    data: {
      scatterPlot: {
        data: [],
        chartOptions: {}
      },
      barCharts: {}
    }
  },
  setOnPan: () => true,
  setOnZoom: () => true,
  setPeriodMultiple: () => { },
  setSeriesPhaseFocus: () => {},
  setSeriesVisibility: () => { },
  setYAxisInversion: () => {},
  theme: {
    dark: false,
    global: {
      colors: {},
      font: {}
    }
  },
  visibleSeries: [],
  zooming: false
}

VariableStarViewer.propTypes = {
  allowPanZoom: PropTypes.string,
  barJSON: PropTypes.shape({
    amplitude: PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    }),
    period: PropTypes.shape({
      data: PropTypes.array,
      options: PropTypes.object
    }),
  }),
  imageSrc: PropTypes.string,
  invertYAxis: PropTypes.bool,
  periodMultiple: PropTypes.number,
  phaseFocusedSeries: PropTypes.number,
  phasedJSON: PropTypes.shape({
    data: PropTypes.array,
    chartOptions: PropTypes.object
  }),
  rawJSON: PropTypes.shape({
    data: PropTypes.object,
    chartOptions: PropTypes.object
  }),
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  setPeriodMultiple: PropTypes.func,
  setSeriesPhaseFocus: PropTypes.func,
  setSeriesVisibility: PropTypes.func,
  setYAxisInversion: PropTypes.func,
  theme: PropTypes.object,
  visibleSeries: PropTypes.arrayOf(PropTypes.object),
  zooming: PropTypes.bool
}

export default withTheme(VariableStarViewer)
export { VariableStarViewer }