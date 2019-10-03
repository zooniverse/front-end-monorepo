import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { zip } from 'lodash'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import Background from '../SVGComponents/Background'
import Chart from '../SVGComponents/Chart'
import Axes from './components/Axes'
import { MARGIN, PADDING } from './helpers/constants'

function ScatterPlotViewer(props) {
  const {
    chartStyles,
    children,
    data,
    parentHeight,
    parentWidth,
    tickStyles,
    transformMatrix,
    xAxisLabel,
    yAxisLabel
  } = props

  const {
    background,
    dataPointSize,
    color
  } = chartStyles

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
        top={MARGIN}
      >
        {dataPoints.map((point, index) => {
          const cx = xScaleTransformed(point[0])
          const cy = yScaleTransformed(point[1])
          return (
            <Circle
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
        tickStyles={tickStyles}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
      />
    </Chart>
  )
}

ScatterPlotViewer.defaultProps = {
  chartStyles: {
    color: '#eff2f5', // Zooniverse Light Grey
    background: '#003941', // Zooniverse Dark Teal
    dataPointSize: '1.5',
    fontFamily: 'inherit',
    fontSize: '0.75rem'
  },
  data: {
    x: [1],
    y: [1]
  },
  panning: false,
  tickStyles: {
    direction: 'outer',
    length: 5
  },
  xAxisLabel: 'x-axis',
  yAxisLabel: 'y-axis',
  zooming: false,
}

ScatterPlotViewer.propTypes = {
  chartStyles: PropTypes.object,
  data: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  tickStyles: PropTypes.shape({
    direction: PropTypes.oneOf(['inner', 'outer']),
    length: PropTypes.number
  }),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  zooming: PropTypes.bool,
}

export default ScatterPlotViewer
