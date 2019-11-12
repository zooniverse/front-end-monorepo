import React from 'react'
import PropTypes from 'prop-types'
import { zip } from 'lodash'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import { darken } from 'polished'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import Axes from '../Axes'
import {
  left,
  transformXScale,
  transformYScale,
  top,
} from '../../helpers/utils'

function ScatterPlot(props) {
  const {
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

  const background = backgroundColor || darken(0.08, colors['neutral-2'])
  const color = colors['light-1']
  const dataPoints = zip(data.x, data.y)

  console.log('data', data)
  console.log(transformMatrix)
  const xScaleTransformed = xScale || transformXScale(data, transformMatrix, rangeParameters)

  const yScaleTransformed = yScale || transformYScale(data, transformMatrix, rangeParameters)

  const axesConfig = {
    xAxis: {
      label: xAxisLabel,
      orientation: 'bottom',
      scale: xScaleTransformed,
    },
    yAxis: {
      label: yAxisLabel,
      orientation: 'left',
      scale: yScaleTransformed,
    }
  }

  return (
    <Chart
      height={parentHeight}
      width={parentWidth}
    >
      <Background fill={background} />
      <Group
        left={leftPosition}
        top={topPosition}
      >
        {dataPoints.map((point, index) => {
          const cx = xScaleTransformed(point[0])
          const cy = yScaleTransformed(point[1])

          if (index === 1) {
            console.log(cx, cy)
          }
          return (
            <Circle
              data-x={point[0]}
              data-y={point[1]}
              key={index}
              cx={cx}
              cy={cy}
              r={dataPointSize}
              fill={color}
            />
          )
        })}
      </Group>
      {children}
      <Group
        left={leftPosition}
        top={margin.top}
      >
        <Axes
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
  backgroundColor: '',
  dataPointSize: 1.5,
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
  backgroundColor: PropTypes.string,
  data: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  dataPointSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
