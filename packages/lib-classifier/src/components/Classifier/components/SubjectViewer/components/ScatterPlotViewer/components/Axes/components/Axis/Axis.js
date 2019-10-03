import React from 'react'
import PropTypes from 'prop-types'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { withTheme } from 'styled-components'

import InnerTickAxis from '../InnerTickAxis'
import { PADDING } from '../../../../helpers/constants'

function Axis ({ axis, parentHeight, parentWidth, theme, tickStyles }) {
  const { direction, length } = tickStyles

  const color = theme.global.colors['light-1']
  const fontFamily = theme.global.font.family
  const fontSize = theme.text.xsmall.size

  const {
    label,
    orientation,
    scale
  } = axis

  if (direction === 'inner') {
    return (
      <InnerTickAxis
        axis={axis}
        color={color}
        fontFamily={fontFamily}
        fontSize={fontSize}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        tickLength={length}
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

Axis.defaultProps = {
  axis: {},
  theme: {
    dark: false
  },
  tickStyles: {
    direction: 'outer',
    length: 5
  }
}

Axis.propTypes = {
  axis: PropTypes.shape({
    label: PropTypes.string.isRequired,
    orientation: PropTypes.oneOf(['bottom', 'left']).isRequired,
    scale: PropTypes.func.isRequired // D3 scaleLinear function
  }),
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  tickStyles: PropTypes.shape({
    direction: PropTypes.oneOf(['inner', 'outer']),
    length: PropTypes.number
  })
}

export default withTheme(Axis)
export { Axis }