import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { zip } from 'lodash'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import { withTheme } from 'styled-components'
import { darken } from 'polished'
import Background from '../SVGComponents/Background'
import Chart from '../SVGComponents/Chart'
import Axes from './components/Axes'
import { MARGIN, PADDING } from './helpers/constants'

function ScatterPlotViewer(props) {
  const {
    children,
    data,
    dataPointSize,
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
    yAxisLabel
  } = props
  
  const background = darken(0.08, colors['neutral-2'])
  const color = colors['light-1']

  const dataPoints = zip(data.x, data.y)
  const dataExtent = {
    x: d3.extent(data.x),
    y: d3.extent(data.y)
  }

  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: [0 + PADDING, parentWidth - MARGIN]
  })

  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: [parentHeight - PADDING, 0 + MARGIN]
  })

  const xScaleTransformed = scaleLinear({
    domain: [
      xScale.invert((xScale(dataExtent.x[0]) - transformMatrix.translateX) / transformMatrix.scaleX),
      xScale.invert((xScale(dataExtent.x[1]) - transformMatrix.translateX) / transformMatrix.scaleX)
    ],
    range: [0 + PADDING, parentWidth - MARGIN]
  });

  const yScaleTransformed = scaleLinear({
    domain: [
      yScale.invert((yScale(dataExtent.y[0]) - transformMatrix.translateY) / transformMatrix.scaleY),
      yScale.invert((yScale(dataExtent.y[1]) - transformMatrix.translateY) / transformMatrix.scaleY)
    ],
    range: [parentHeight - PADDING, 0 + MARGIN],
  })

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
      width={parentWidth + MARGIN}
    >
      <Background fill={background} />
      <Group
        left={MARGIN}
      >
        {dataPoints.map((point, index) => {
          const cx = xScaleTransformed(point[0])
          const cy = yScaleTransformed(point[1])
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
      <Axes
        axesConfig={axesConfig}
        tickDirection={tickDirection}
        tickLength={tickLength}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
      />
    </Chart>
  )
}

ScatterPlotViewer.defaultProps = {
  data: {
    x: [1],
    y: [1]
  },
  dataPointSize: '1.5',
  panning: false,
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  tickDirection: 'outer',
  tickLength: 5,
  xAxisLabel: 'x-axis',
  yAxisLabel: 'y-axis',
  zooming: false,
}

ScatterPlotViewer.propTypes = {
  data: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  dataPointSize: PropTypes.string,
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  tickDirection: PropTypes.oneOf(['inner', 'outer']),
  tickLength: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  zooming: PropTypes.bool,
}

export default withTheme(ScatterPlotViewer)
export { ScatterPlotViewer }
