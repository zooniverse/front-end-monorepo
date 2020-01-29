import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import draggable from '../draggable'

const StyledCircle = styled('circle')`
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 4 : 10

const DragHandle = forwardRef(function DragHandle ({ fill, radius, scale, x, y }, ref) {
  const transform = `translate(${x}, ${y}) scale(${1 / scale})`
  const styleProps = {
    fill,
    stroke: 'currentColor',
    strokeWidth: 1
  }

  return (
    <g
      ref={ref}
      transform={transform}
    >
      <StyledCircle r={radius} {...styleProps} />
      <StyledCircle r={2 * radius} fill='transparent' stroke='transparent' />
    </g>
  )
})

DragHandle.propTypes = {
  fill: PropTypes.string,
  radius: PropTypes.number,
  scale: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

DragHandle.defaultProps = {
  fill: 'currentColor',
  radius: RADIUS,
  scale: 1
}

export default draggable(DragHandle)
