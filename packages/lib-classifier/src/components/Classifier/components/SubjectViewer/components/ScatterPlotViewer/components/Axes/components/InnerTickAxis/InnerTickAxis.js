import React from 'react'
import PropTypes from 'prop-types'
import { Axis } from '@vx/axis'
import { Group } from '@vx/group'
import { Line } from '@vx/shape'
import { MARGIN, PADDING } from '../../../../helpers/constants'

function InnerTickAxis (props) {
  const {
    axis,
    chartStyles,
    parentHeight,
    parentWidth,
    tickLength
  } = props

  const {
    color,
    fontFamily,
    fontSize
  } = chartStyles

  const {
    label,
    orientation,
    scale
  } = axis

  const top = (orientation === 'right') ? PADDING : parentHeight - tickLength
  return (
    <Axis
      hideAxisLine
      label={label}
      left={0}
      orientation={orientation}
      tickLength={tickLength}
      top={top}
      scale={scale}
    >
      {innerAxis => {
        const labelTransform = (orientation === 'right') ?
          `translate(${0 + MARGIN}, ${0 - MARGIN})` :
          `translate(${parentWidth - (PADDING + MARGIN)}, ${0 - MARGIN})`
        return (
          <g>
            {innerAxis.ticks.map((tick, i) => {
              const tickLabelTransform = (orientation === 'right') ?
                `translate(${tick.to.x + tickLength}, ${tick.to.y + 3})` :
                `translate(${tick.to.x}, ${tick.to.y - MARGIN})`
              const tickTextAnchor = (orientation === 'right') ? 'start' : 'middle'
              return (
                <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                  <Line from={tick.from} to={tick.to} stroke={color} />
                  <text
                    transform={tickLabelTransform}
                    fontSize={fontSize}
                    textAnchor={tickTextAnchor}
                    fill={color}
                  >
                    {tick.formattedValue}
                  </text>
                </Group>
              );
            })}
            <text fill={color} fontSize={fontSize} transform={labelTransform}>{innerAxis.label}</text>
          </g>
        )
      }}
    </Axis>
  )
}

export default InnerTickAxis