import PropTypes from 'prop-types'
import { useTheme } from 'styled-components'
import { Group } from '@visx/group'
import cuid from 'cuid'

import Background from '@viewers/components/SVGComponents/Background'
import Chart from '@viewers/components/SVGComponents/Chart'
import getZoomBackgroundColor from '@viewers/helpers/getZoomBackgroundColor'
import sortDataPointsByHighlight from '@viewers/helpers/sortDataPointsByHighlight'
import Axes from '../Axes'
import { ScatterPlotSeries, Selections } from './components'

import {
  getDataPoints,
  left,
  transformXScale,
  transformYScale,
  top
} from '../../helpers/utils'

const INVERT_AXES = {
  x: false,
  y: false
}

const MARGIN = {
  bottom: 60,
  left: 60,
  right: 10,
  top: 10
}

const PADDING = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

const TRANSFORM_MATRIX = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

export default function ScatterPlot({
  axisColor = '',
  backgroundColor = '',
  children,
  color = '',
  data,
  dataPointSize = 25,
  disabled = false,
  experimentalSelectionTool = false,
  feedbackBrushes = [],
  highlightedSeries,
  initialSelections = [],
  interactionMode = 'annotate',
  invertAxes = INVERT_AXES,
  margin = MARGIN,
  padding = PADDING,
  panning = false,
  parentHeight,
  parentWidth,
  tickDirection = 'outer',
  tickLength = 5,
  transformMatrix = TRANSFORM_MATRIX,
  transform,
  underlays = [],
  xAxisLabel = 'x-axis',
  xAxisLabelOffset,
  xAxisNumTicks = 10,
  xScale = null,
  yAxisLabel = 'y-axis',
  yAxisLabelOffset,
  yAxisNumTicks = 10,
  yScale = null,
  zooming = false
}) {
  const {
    dark,
    global: {
      colors = {}
    }
  } = useTheme()

  const rangeParameters = {
    invertAxes,
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection
  }

  const leftPosition = left(tickDirection, margin)
  const topPosition = top(tickDirection, margin)

  let background 
  if (backgroundColor) {
    background = backgroundColor
  } else {
    background = getZoomBackgroundColor(dark, zooming, colors)
  }

  const dataPoints = getDataPoints(data)
  const xScaleTransformed = xScale || transformXScale(data, transformMatrix, rangeParameters)

  const yScaleTransformed = yScale || transformYScale(data, transformMatrix, rangeParameters)

  const sortedDataPoints = sortDataPointsByHighlight(dataPoints, highlightedSeries)

  const axesConfig = {
    color: axisColor,
    xAxis: {
      label: xAxisLabel,
      labelOffset: xAxisLabelOffset,
      numTicks: xAxisNumTicks,
      orientation: 'bottom',
      scale: xScaleTransformed
    },
    yAxis: {
      label: yAxisLabel,
      labelOffset: yAxisLabelOffset,
      numTicks: yAxisNumTicks,
      orientation: 'left',
      scale: yScaleTransformed
    }
  }

  const clipPathId = cuid()
  const plotHeight = parentHeight - margin.bottom - margin.top
  const plotWidth = parentWidth - margin.right - margin.left

  let underlayParameters = []
  if (underlays.length > 0) {
    underlayParameters = underlays.map((underlay) => {
      const { fill, startPosition, xAxisWidth } = underlay
      const left = xScaleTransformed(startPosition)
      const width = xScaleTransformed(0) - xScaleTransformed(-xAxisWidth)
      return { fill, left, width }
    })
  }

  return (
    <Chart
      className='scatterPlot'
      height={parentHeight}
      style={{
        touchAction: 'pinch-zoom'
      }}
      width={parentWidth}
    >
      <Background fill={background} />
      <clipPath id={`scatter-plot-${clipPathId}`}>
        <rect
          height={plotHeight}
          width={plotWidth}
        />
      </clipPath>
      <Group
        className='chartContent'
        clipPath={`url(#scatter-plot-${clipPathId})`}
        left={leftPosition}
        top={topPosition}
      >
        {tickDirection === 'outer' &&
          <Background
            borderColor={(dark) ? colors['light-5'] : colors['dark-5']}
            fill={(dark) ? colors['light-3'] : colors['neutral-6']}
            height={plotHeight}
            underlayParameters={underlayParameters}
            width={plotWidth}
          />}
        {sortedDataPoints.map((series, seriesIndex) => (
          <ScatterPlotSeries
            key={`series-${seriesIndex}`}
            color={color}
            dataPointSize={dataPointSize}
            highlightedSeries={highlightedSeries}
            series={series}
            seriesIndex={seriesIndex}
            xScale={xScaleTransformed}
            yScale={yScaleTransformed}
          />
        ))}
        {children}
        {experimentalSelectionTool && <Selections
          disabled={disabled || interactionMode !== 'annotate'}
          feedbackBrushes={feedbackBrushes}
          height={plotHeight}
          margin={margin}
          transformMatrix={transformMatrix}
          width={plotWidth}
          xScale={xScaleTransformed}
          yScale={yScaleTransformed}
        />}
      </Group>
      <Group
        className='chartAxes'
        left={leftPosition}
        top={margin.top}
      >
        <Axes
          axisColor={axisColor}
          axesConfig={axesConfig}
          margin={margin}
          padding={padding}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          tickDirection={tickDirection}
          tickLength={tickLength}
        />
      </Group>
    </Chart>
  )
}



ScatterPlot.propTypes = {
  axisColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number),
      y: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.arrayOf(PropTypes.shape({
      seriesData: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        x_error: PropTypes.number,
        y_error: PropTypes.number
      })).isRequired,
      seriesOptions: PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string.isRequired
      }).isRequired
    }))
  ]).isRequired,
  dataPointSize: PropTypes.number,
  highlightedSeries: PropTypes.arrayOf(PropTypes.object),
  invertAxes: PropTypes.shape({
    x: PropTypes.bool,
    y: PropTypes.bool
  }),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  tickDirection: PropTypes.oneOf(['inner', 'outer']),
  tickLength: PropTypes.number,
  transformMatrix: PropTypes.shape({
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    skewX: PropTypes.number,
    skewY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number
  }),
  underlays: PropTypes.arrayOf(PropTypes.object),
  xAxisLabel: PropTypes.string,
  xAxisLabelOffset: PropTypes.number,
  xAxisNumTicks: PropTypes.number,
  xScale: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  yAxisLabel: PropTypes.string,
  yAxisLabelOffset: PropTypes.number,
  yAxisNumTicks: PropTypes.number,
  yScale: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  zooming: PropTypes.bool
}
