import React from 'react'
import PropTypes from 'prop-types'
import { Axis } from '@vx/axis'
import { Group } from '@vx/group'
import { Circle, Line } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import { withParentSize } from '@vx/responsive'
import Background from '../../SVGComponents/Background'
import Chart from '../../SVGComponents/Chart'

function VXLightCurveViewer({ chartStyles, dataExtent, dataPoints, margin, padding, parentHeight, parentWidth }) {
  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: [0 + padding, parentWidth - margin]
  })
  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: [parentHeight - padding, 0 + margin]
  })

  const {
    background,
    dataPointSize,
    color,
    fontFamily,
    fontSize
  } = chartStyles

  console.log(parentWidth, parentHeight)
  return (
    <Chart height={parentHeight} width={parentWidth + margin}>
      <Background fill={background} />
      <Group top={margin} left={margin}>
        {dataPoints.map((point, index) => {
          const cx = xScale(point[0])
          const cy = yScale(point[1])
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
      <Group>
        <Axis
          hideAxisLine
          label='Brightness'
          left={0}
          orientation="right"
          tickLength={5}
          top={padding} 
          scale={yScale}
        >
          {axis => {
            return (
              <g>
                {axis.ticks.map((tick, i) => {
                  return (
                    <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                      <Line from={tick.from} to={tick.to} stroke={color} />
                      <text
                        transform={`translate(${tick.to.x + 5}, ${tick.to.y + 3})`}
                        fontSize={fontSize}
                        textAnchor="start"
                        fill={color}
                      >
                        {tick.formattedValue}
                      </text>
                    </Group>
                  );
                })}
                <text fill={color} fontSize={fontSize} transform={`translate(${0 + margin}, ${0 - margin})`}>{axis.label}</text>
              </g>
            )
          }}
        </Axis>
        <Axis
          hideAxisLine
          label='Days'
          left={0}
          orientation="bottom"
          tickLength={5}
          top={parentHeight - 5}
          scale={xScale}
        >
          {axis => {
            return (
              <g>
                {axis.ticks.map((tick, i) => {
                  return (
                    <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                      <Line from={tick.from} to={tick.to} stroke={color} />
                      <text
                        transform={`translate(${tick.to.x}, ${tick.to.y - margin})`}
                        fontSize={fontSize}
                        textAnchor="middle"
                        fill={color}
                      >
                        {tick.formattedValue}
                      </text>
                    </Group>
                  );
                })}
                <text fill={color} fontSize={fontSize} transform={`translate(${parentWidth - (padding + margin)}, ${0 - margin})`}>{axis.label}</text>
              </g>
            )
          }}
        </Axis>
      </Group>
    </Chart>
  )
}

VXLightCurveViewer.defaultProps = {
  chartStyles: {
    color: '#eff2f5', // Zooniverse Light Grey
    background: '#003941', // Zooniverse Dark Teal
    dataPointSize: '1.5',
    fontFamily: 'inherit',
    fontSize: '0.75rem'
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

export default withParentSize(VXLightCurveViewer)
