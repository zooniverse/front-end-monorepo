import React from 'react'
import PropTypes from 'prop-types'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { withTheme } from 'styled-components'
import InnerTickAxis from '../InnerTickAxis'

function Axis (props) {
  const {
    axis,
    margin,
    padding,
    parentHeight,
    parentWidth,
    theme,
    tickDirection,
    tickLength
  } = props
  const color = theme.global.colors['light-1']
  const fontFamily = theme.global.font.family

  const {
    label,
    orientation,
    scale
  } = axis
  // :( this doesn't work because of https://github.com/hshoff/vx/issues/283
  // const fontSize = theme.text.xsmall.size
  const fontSize = 12

  if (tickDirection === 'inner') {
    return (
      <InnerTickAxis
        axis={axis}
        color={color}
        fontSize={fontSize}
        margin={margin}
        padding={padding}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        tickLength={tickLength}
      />
    )
  }

  if (orientation === 'left') {
    return (
      <AxisLeft
        label={label}
        labelProps={{
          fill: color,
          fontSize,
          fontFamily,
          textAnchor: 'middle'
        }}
        left={padding.left}
        tickLabelProps={() => ({
          dx: '-0.25em',
          dy: '0.25em',
          fill: color,
          fontSize,
          fontFamily,
          textAnchor: 'end'
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
          fontFamily,
          textAnchor: 'middle'
        }}
        left={0}
        tickLabelProps={() => ({
          dy: '0.25em',
          fill: color,
          fontSize,
          fontFamily,
          textAnchor: 'middle'
        })}
        tickStroke={color}
        stroke={color}
        scale={scale}
        top={parentHeight - margin.bottom - margin.top}
      />
    )
  }

  return null
}

Axis.defaultProps = {
  axis: {},
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  tickDirection: 'outer',
  tickLength: 5
}

Axis.propTypes = {
  axis: PropTypes.shape({
    label: PropTypes.string.isRequired,
    orientation: PropTypes.oneOf(['bottom', 'left']).isRequired,
    scale: PropTypes.func.isRequired // D3 scaleLinear function
  }),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }).isRequired,
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }).isRequired,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  tickDirection: PropTypes.oneOf(['inner', 'outer']),
  tickLength: PropTypes.number
}

export default withTheme(Axis)
export { Axis }
