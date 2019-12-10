import React, { forwardRef } from 'react'
import styled from 'styled-components'
import draggable from '../draggable'

const StyledCircle = styled('circle')`
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 4 : 10

const DragHandle = forwardRef(function DragHandle ({ fill, radius, scale, x, y }, ref) {
  const styleProps = {
    fill: fill || 'currentColor',
    stroke: 'currentColor',
    strokeWidth: 1,
    transform: `\
translate(${x}, ${y})
scale(${1 / scale})\
`
  }
  const r = radius || RADIUS
  return (
    <g
      ref={ref}
    >
      <StyledCircle r={r} {...styleProps} />
      <StyledCircle r={2 * r} fill='transparent' stroke='transparent' />
    </g>
  )
})

export default draggable(DragHandle)
