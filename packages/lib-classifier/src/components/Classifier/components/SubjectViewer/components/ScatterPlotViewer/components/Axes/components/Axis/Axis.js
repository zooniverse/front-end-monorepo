import React from 'react'
import PropTypes from 'prop-types'
import { AxisLeft, AxisBottom } from '@vx/axis'
import InnerTickAxis from '../InnerTickAxis'
import { PADDING } from '../../../../helpers/constants'

function Axis ({ axis, chartStyles, parentHeight, parentWidth, tickStyles }) {
  const { direction, length } = tickStyles
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

  if (direction === 'inner') {
    return (
      <InnerTickAxis
        axis={axis}
        chartStyles={chartStyles}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        tickLength={length}
      />
    )
  }

  if (orientation === 'right') {
    return (
      <AxisLeft
        label={label}
        labelProps={{
          fill: color,
          fontSize,
          fontFamily
        }}
        left={PADDING}
        tickLabelProps={() => ({
          fill: color,
          fontSize,
          fontFamily,
          dx: '0.25em',
          dy: '-0.25em'
        })}
        tickStroke={color}
        stroke={color}
        scale={scale}
        top={0}
      />
    )
  }

  if (orientation === 'bottom') {
    return (
      <AxisBottom
        label={label}
        labelProps={{
          fill: color,
          fontSize,
          fontFamily
        }}
        left={0}
        tickLabelProps={() => ({
          fill: color,
          fontSize,
          fontFamily,
          dx: '-0.25em',
          dy: '0.25em'
        })}
        tickStroke={color}
        stroke={color}
        scale={scale}
        top={parentHeight - PADDING}
      />
    )
  }

  return null
}

export default Axis