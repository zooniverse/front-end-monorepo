import React from 'react'
import PropTypes from 'prop-types'
import { Axis } from '@vx/axis'
import { Group } from '@vx/group'
import { Circle, Line } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import withVXZoom from './withVXZoom'
import Background from '../../SVGComponents/Background'
import Chart from '../../SVGComponents/Chart'

function VXLightCurveViewer(props) {
  const {
    chartStyles,
    dataExtent,
    dataPoints,
    margin,
    padding,
    parentHeight,
    parentWidth,
    panning,
    transformMatrix,
    zooming
  } = props

  const xScale = scaleLinear({
    domain: dataExtent.x,
    range: [0 + padding, parentWidth - margin]
  })
  const yScale = scaleLinear({
    domain: dataExtent.y,
    range: [parentHeight - padding, 0 + margin]
  })

  const xScaleTransformed = scaleLinear({
    domain: [
      xScale.invert((xScale(dataExtent.x[0]) - transformMatrix.translateX) / transformMatrix.scaleX),
      xScale.invert((xScale(dataExtent.x[1]) - transformMatrix.translateX) / transformMatrix.scaleX),
    ],
    range: [0 + padding, parentWidth - margin]
  });

  const yScaleTransformed = scaleLinear({
    domain: [
      yScale.invert((yScale(dataExtent.y[0]) - transformMatrix.translateY) / transformMatrix.scaleY),
      yScale.invert((yScale(dataExtent.y[1]) - transformMatrix.translateY) / transformMatrix.scaleY),
    ],
    range: [parentHeight - padding, 0 + margin],
  })

  const {
    background,
    dataPointSize,
    color,
    fontFamily,
    fontSize,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onDoubleClick
  } = chartStyles

  return (
    <Chart
      height={parentHeight}
      panning={panning ? 'true' : undefined}
      width={parentWidth + margin} 
      zooming={zooming ? 'true' : undefined}
    >
      <Background fill={background} />
      <Group
        left={margin}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onDoubleClick={onDoubleClick}
        top={margin}
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
      <Group>
        <Axis
          hideAxisLine
          label='Brightness'
          left={0}
          orientation="right"
          tickLength={5}
          top={padding} 
          scale={yScaleTransformed}
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
          scale={xScaleTransformed}
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
  margin: 10,

  padding: 30,
  panning: false,
  zooming: false,
}

VXLightCurveViewer.propTypes = {
  chartStyles: PropTypes.object,
  dataExtent: PropTypes.shape({
    x: PropTypes.array,
    y: PropTypes.array
  }),
  dataPoints: PropTypes.array,
  panning: PropTypes.bool,
  zooming: PropTypes.bool,
}

export default withVXZoom(VXLightCurveViewer)
