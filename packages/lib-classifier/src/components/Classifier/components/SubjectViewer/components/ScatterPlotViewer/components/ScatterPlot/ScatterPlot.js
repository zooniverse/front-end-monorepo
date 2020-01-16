import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import cuid from 'cuid'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import Axes from '../Axes'
import { glyphComponents } from '../../helpers/constants'

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
    glyphColors,
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

  // The drawing tool colors, only used in the lab right now
  // Candidates to be moved into the zooniverse theme
  const standardGlyphColors = [
    '#FF3C25',
    '#235DFF',
    '#FFFF03',
    '#FF9300',
    '#06FE76',
    '#0CFFE0',
    '#FF40FF'
  ]

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
  return (
    <Chart
      height={parentHeight}
      width={parentWidth}
    >
      <Background fill={background} />
      <clipPath id={`scatter-plot-${clipPathId}`}>
        <rect
          height={parentHeight - margin.bottom - margin.top}
          width={parentWidth - margin.right - margin.left}
        />
      </clipPath>
      <Group
        clipPath={`url(#scatter-plot-${clipPathId})`}
        left={leftPosition}
        top={topPosition}
      >
        {tickDirection === 'outer' &&
          <Background
            borderColor={axisColor}
            fill='#ffffff'
            left={leftPosition}
            top={topPosition}
          />}
        {dataPoints.map((series, seriesIndex) => {
          const glyphColor = series.seriesOptions?.color ||
          glyphColors[seriesIndex] ||
          standardGlyphColors[seriesIndex]

          const GlyphComponent = glyphComponents[seriesIndex]

          return series.seriesData.map((point, pointIndex) => {
            const cx = xScaleTransformed(point.x)
            const cy = yScaleTransformed(point.y)

            return (
              <GlyphComponent
                data-x={point.x}
                data-y={point.y}
                key={pointIndex}
                left={cx}
                size={dataPointSize}
                top={cy}
                fill={glyphColor}
              />
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
  glyphColors: [],
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
  glyphColors: PropTypes.arrayOf(PropTypes.string),
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
