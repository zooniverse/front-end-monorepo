import React, { forwardRef } from 'react'
import styled from 'styled-components'
import draggable from '../draggable'

const StyledCircle = styled('circle')`
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 4 : 10
const OVERSHOOT = screen.width > 900 ? 4 : 10

const DragHandle = forwardRef(function DragHandle({ scale, x, y }, ref) {

  const styleProps = {
    fill: 'currentColor',
    stroke: 'transparent',
    strokeWidth: OVERSHOOT,
    transform: `\
translate(${x}, ${y})
scale(${1 / scale})\
`
  }
  return <StyledCircle ref={ref} r={RADIUS} {...styleProps} />
})

export default draggable(DragHandle)
