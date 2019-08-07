import React from 'react'
import PropTypes from 'prop-types'
import { Axis } from '@vx/axis'
import { Group } from '@vx/group'
import { Circle, Line } from '@vx/shape'
import { scaleLinear } from '@vx/scale'
import { withParentSize } from '@vx/responsive'
import { localPoint } from '@vx/event'
import { Zoom } from '@vx/zoom'
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
    zooming,
    zoomInValue,
    zoomOutValue
  } = props

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

  return (
    <Zoom
      height={parentHeight}
      scaleXMin={1}
      scaleXMax={parentWidth + margin}
      scaleYMin={1}
      scaleYMax={1}
      width={parentWidth}
    >
      {zoom => {
        console.log(zoom)
        return (
          <Chart
            height={parentHeight}
            panning={zoom.isDragging && panning ? 'true' : undefined}
            width={parentWidth + margin} 
            zooming={zooming ? 'true' : undefined}
          >
            <Background fill={background} />
            <Group
              left={margin}
              onWheel={zooming ? zoom.handleWheel : () => {}}
              onMouseDown={panning ? zoom.dragStart : () => {}}
              onMouseMove={panning ? zoom.dragMove: () => {}}
              onMouseUp={panning ? zoom.dragEnd : () => {}}
              onMouseLeave={() => {
                if (!zoom.isDragging && !panning) return
                zoom.dragEnd()
              }}
              onDoubleClick={event => {
                const point = localPoint(event);
                zoom.scale({ scaleX: zoomInValue, scaleY: 1, point });
              }}
              top={margin}
            >
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
      }}
    </Zoom>
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
  minZoom: 1,
  maxZoom: 10,
  padding: 30,
  panning: false,
  zooming: false,
  zoomInValue: 1.2,
  zoomOutValue: 0.8
}

VXLightCurveViewer.propTypes = {
  chartStyles: PropTypes.object,
  dataExtent: PropTypes.shape({
    x: PropTypes.array,
    y: PropTypes.array
  }),
  dataPoints: PropTypes.array,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  panning: PropTypes.bool,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  zooming: PropTypes.bool,
  zoomInValue: PropTypes.number,
  zoomOutValue: PropTypes.number
}

export default withParentSize(VXLightCurveViewer)
