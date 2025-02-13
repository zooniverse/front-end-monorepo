import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import draggable from '../draggable'
import { STROKE_WIDTH } from '../Mark/Mark';

const StyledCircle = styled('circle')`
  stroke-width: 2;
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 3 * STROKE_WIDTH : 5 * STROKE_WIDTH

const DragHandle = forwardRef(function DragHandle(
  {
    fill = 'currentColor',
    radius = RADIUS,
    scale = 1,
    x,
    y,
    dragging = false,
    invisibleWhenDragging = false,
    testid,
  },
  ref
) {
  const transform = `translate(${x}, ${y}) scale(${1 / scale})`
  const styleProps = {
    fill: dragging && invisibleWhenDragging ? 'transparent' : fill,
    stroke: dragging && invisibleWhenDragging ? 'transparent' : 'currentColor',
    strokeWidth: 1
  }

  return (
    <g ref={ref} transform={transform} data-testid={testid} >
      <StyledCircle r={radius} {...styleProps} vectorEffect={'non-scaling-size'} />
      <StyledCircle r={2 * radius} fill='transparent' stroke='transparent' vectorEffect={'non-scaling-size'} />
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

export default draggable(DragHandle)
