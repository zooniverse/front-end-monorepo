import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import draggable from '../draggable'
import { STROKE_WIDTH } from '../Mark/Mark';

import useScale from '../../hooks/useScale'

const StyledCircle = styled('circle')`
  stroke-width: 2;
  &:hover {
    cursor: move;
  }
`
const RADIUS = screen.width > 900 ? 3 * STROKE_WIDTH : 5 * STROKE_WIDTH
const DEFAULT_HANDLER = () => false

function DragHandleWithRef(
  {
    fill = 'currentColor',
    radius = RADIUS,
    x,
    y,
    dragging = false,
    invisibleWhenDragging = false,
    onPointerDown = DEFAULT_HANDLER,
    onPointerMove = DEFAULT_HANDLER,
    onPointerUp = DEFAULT_HANDLER,
    ...props
  },
  ref
) {
  const scale = useScale()
  const transform = `translate(${x}, ${y}) scale(${1 / scale})`
  const styleProps = {
    fill: dragging && invisibleWhenDragging ? 'transparent' : fill,
    stroke: dragging && invisibleWhenDragging ? 'transparent' : 'currentColor',
    strokeWidth: 1
  }

  return (
    <g
      ref={ref}
      transform={transform}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      {...props}
    >
      <StyledCircle r={radius} {...styleProps} vectorEffect={'non-scaling-stroke'} />
      <StyledCircle r={2 * radius} fill='transparent' stroke='transparent' vectorEffect={'non-scaling-stroke'} />
    </g>
  )
}

const DragHandle = forwardRef(DragHandleWithRef)

DragHandle.propTypes = {
  fill: PropTypes.string,
  invisibleWhenDragging: PropTypes.bool,
  onPointerDown: PropTypes.func,
  onPointerMove: PropTypes.func,
  onPointerUp: PropTypes.func,
  radius: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default draggable(DragHandle)
