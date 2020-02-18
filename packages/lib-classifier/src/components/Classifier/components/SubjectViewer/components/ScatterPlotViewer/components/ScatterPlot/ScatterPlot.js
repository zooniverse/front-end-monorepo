import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import cuid from 'cuid'
import { lighten } from 'polished'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import Axes from '../Axes'
import getDataSeriesColor from '../../../../helpers/getDataSeriesColor'
import getDataSeriesSymbol from '../../../../helpers/getDataSeriesSymbol'

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
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection,
    tickLength,
    theme: {
      global: {
        colors
      }
    },
    transformMatrix,
    xAxisLabel,
    yAxisLabel,
    xScale,
    yScale
  } = props

  const rangeParameters = {
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection
  }

  const leftPosition = left(tickDirection, margin)
  const topPosition = top(tickDirection, margin)

  const background = backgroundColor || colors['light-1']
  const dataPoints = getDataPoints(data)

  const xScaleTransformed = xScale || transformXScale(data, transformMatrix, rangeParameters)

  const yScaleTransformed = yScale || transformYScale(data, transformMatrix, rangeParameters)

  const axesConfig = {
    color: axisColor,
    xAxis: {
      label: xAxisLabel,
      orientation: 'bottom',
      scale: xScaleTransformed
    },
    yAxis: {
      label: yAxisLabel,
      orientation: 'left',
      scale: yScaleTransformed
    }
  }

  const clipPathId = cuid()
  const plotHeight = parentHeight - margin.bottom - margin.top
  const plotWidth = parentWidth - margin.right - margin.left
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
            borderColor={colors['dark-5']}
            fill='#ffffff'
            height={plotHeight}
            left={leftPosition}
            top={topPosition}
            width={plotWidth}
          />}
        {dataPoints.map((series, seriesIndex) => {
          const glyphColor = getDataSeriesColor({
            defaultColors: Object.values(colors.drawingTools),
            seriesOptions: series.seriesOptions,
            seriesIndex,
            themeColors: colors
          })

          const errorBarColor = lighten(0.25, glyphColor)
          const GlyphComponent = getDataSeriesSymbol(seriesIndex)

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
                    strokeWidth={1}
                    x1={xErrorBarPoints.x1}
                    x2={xErrorBarPoints.x2}
                    y1={cy}
                    y2={cy}
                  />}
                {y_error &&
                  <line
                    stroke={errorBarColor}
                    strokeWidth={1}
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
  dataPointSize: 20,
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
  xAxisLabel: 'x-axis',
  yAxisLabel: 'y-axis',
  xScale: null,
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
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xScale: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  yScale: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  zooming: PropTypes.bool
}

export default ScatterPlot
