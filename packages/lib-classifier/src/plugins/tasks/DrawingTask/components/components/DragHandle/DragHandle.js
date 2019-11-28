import React, { forwardRef } from 'react'
import styled from 'styled-components'
import draggable from '../draggable'


const StyledCircle = styled('circle')`
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 4 : 10;
const OVERSHOOT = screen.width > 900 ? 4 : 10;


const DragHandle = forwardRef(({ svg, x, y }, ref) => {
  const matrix = svg.getScreenCTM();

  const styleProps = {
    fill: 'currentColor',
    stroke: 'transparent',
    strokeWidth: OVERSHOOT,
    transform: `\
translate(${x}, ${y})
matrix( ${1/matrix.a} 0 0 ${1/matrix.d} 0 0)\
`
  }
  return <StyledCircle ref={ref} r={RADIUS} {...styleProps} />
})

export default draggable(DragHandle)