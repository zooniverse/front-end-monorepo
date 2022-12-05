import PropTypes from 'prop-types'
import { Group } from '@visx/group'
import cuid from 'cuid'
import { lighten } from 'polished'
import Background from '@viewers/components/SVGComponents/Background'
import Chart from '@viewers/components/SVGComponents/Chart'
import Axes from '../Axes'
import getDataSeriesColor from '@viewers/helpers/getDataSeriesColor'
import getDataSeriesSymbol from '@viewers/helpers/getDataSeriesSymbol'
import isDataSeriesHighlighted from '@viewers/helpers/isDataSeriesHighlighted'
import getZoomBackgroundColor from '@viewers/helpers/getZoomBackgroundColor'
import sortDataPointsByHighlight from '@viewers/helpers/sortDataPointsByHighlight'

import {
  getDataPoints,
  left,
  transformXScale,
  transformYScale,
  top
} from '../../helpers/utils'

function ScatterPlot (props) {
  const {
    axisColor,
    backgroundColor,
    children,
    data,
    dataPointSize,
    highlightedSeries,
    invertAxes,
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection,
    tickLength,
    theme: {
      dark,
      global: {
        colors
      }
    },
    transformMatrix,
    transform,
    underlays,
    xAxisLabel,
    xAxisLabelOffset,
    xAxisNumTicks,
    xScale,
    yAxisLabel,
    yAxisLabelOffset,
    yAxisNumTicks,
    yScale,
    zooming
  } = props

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
      height={parentHeight}
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
        clipPath={`url(#scatter-plot-${clipPathId})`}
        left={leftPosition}
        top={topPosition}
      >
        {tickDirection === 'outer' &&
          <Background
            borderColor={(dark) ? colors['light-5'] : colors['dark-5']}
            fill={(dark) ? colors['light-3'] : colors['neutral-6']}
            height={plotHeight}
            left={leftPosition}
            top={topPosition}
            underlayParameters={underlayParameters}
            width={plotWidth}
          />}
        {sortedDataPoints.map((series, seriesIndex) => {
          const highlighted = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: series?.seriesOptions })
          const glyphColor = getDataSeriesColor({
            defaultColors: Object.values(colors.drawingTools),
            seriesOptions: series?.seriesOptions,
            seriesIndex,
            themeColors: colors,
            highlighted
          })

          const errorBarColor = lighten(0.25, glyphColor)
          const GlyphComponent = getDataSeriesSymbol({ seriesOptions: series?.seriesOptions, seriesIndex })

          return series.seriesData.map((point, pointIndex) => {
            let xErrorBarPoints, yErrorBarPoints
            const { x, y, x_error, y_error } = point
            const cx = xScaleTransformed(x)
            const cy = yScaleTransformed(y)

            if (x_error) {
              xErrorBarPoints = {
                x1: xScaleTransformed(x - x_error),
                x2: xScaleTransformed(x + x_error)
              }
            }

            if (y_error) {
              yErrorBarPoints = {
                y1: yScaleTransformed(y + y_error),
                y2: yScaleTransformed(y - y_error)
              }
            }

            return (
              <g key={pointIndex}>
                {x_error &&
                  <line
                    stroke={errorBarColor}
                    strokeWidth={2}
                    x1={xErrorBarPoints.x1}
                    x2={xErrorBarPoints.x2}
                    y1={cy}
                    y2={cy}
                  />}
                {y_error &&
                  <line
                    stroke={errorBarColor}
                    strokeWidth={2}
                    x1={cx}
                    x2={cx}
                    y1={yErrorBarPoints.y1}
                    y2={yErrorBarPoints.y2}
                  />}
                <GlyphComponent
                  data-x={x}
                  data-y={y}
                  left={cx}
                  size={dataPointSize}
                  top={cy}
                  fill={glyphColor}
                  stroke={(highlighted) ? 'black' : colors['light-4']}
                />
              </g>
            )
          })
        })}
      </Group>
      {children}
      <Group
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

ScatterPlot.defaultProps = {
  axisColor: '',
  backgroundColor: '',
  dataPointSize: 25,
  invertAxes: {
    x: false,
    y: false
  },
  margin: {
    bottom: 60,
    left: 60,
    right: 10,
    top: 10
  },
  padding: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  panning: false,
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  tickDirection: 'outer',
  tickLength: 5,
  transformMatrix: {
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0
  },
  underlays: [],
  xAxisLabel: 'x-axis',
  xAxisNumTicks: 10,
  xScale: null,
  yAxisLabel: 'y-axis',
  yAxisNumTicks: 10,
  yScale: null,
  zooming: false
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
  theme: PropTypes.object,
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

export default ScatterPlot
