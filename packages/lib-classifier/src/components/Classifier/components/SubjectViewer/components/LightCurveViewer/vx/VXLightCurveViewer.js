import React from 'react'
import PropTypes from 'prop-types'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import Background from '../../SVGComponents/Background'
import Chart from '../../SVGComponents/Chart'

function VXLightCurveViewer({ chartStyles, dataExtent, dataPoints, height, margin, padding, width }) {
  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: [0 + padding, width - margin],
    // clamp: true
  })
  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: [height - padding, 0 + margin],
    // clamp: true
  })
  return (
    <Chart height={height} width={width}>
      <Background fill={chartStyles.background} />
      <Group>
        {dataPoints.map((point, index) => {
          const cx = xScale(point.x)
          const cy = yScale(point.y)
          return (
            <Circle
              key={index}
              cx={cx}
              cy={cy}
              r={chartStyles.dataPointSize}
              fill={chartStyles.color}
            />
          )
        })}
      </Group>
    </Chart>
  )
}

VXLightCurveViewer.defaultProps = {
  chartStyles: {
    color: '#eff2f5', // Zooniverse Light Grey
    background: '#003941', // Zooniverse Dark Teal
    dataPointSize: '1.5'
  },
  dataExtent: { x: [-1, 1], y: [-1, 1] },
  dataPoints: [[]],
  padding: 30,
  margin: 10
}

VXLightCurveViewer.propTypes = {
  chartStyles: PropTypes.object,
  dataExtent: PropTypes.shape({
    x: PropTypes.array,
    y: PropTypes.array
  }),
  dataPoints: PropTypes.array
}

export default VXLightCurveViewer
