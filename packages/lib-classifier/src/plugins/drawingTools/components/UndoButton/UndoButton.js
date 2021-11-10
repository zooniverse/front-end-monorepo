import React, { forwardRef } from 'react'
import { number, func } from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'

const StyledGroup = styled('g')`
  &:hover {
    cursor: pointer;
  }
`

const UndoButton = forwardRef(function UndoButton(
  { scale = 1, x, y, undoDrawing },
  ref
) {
  const ARIA_LABEL = 'Undo'
  const RADIUS = 11
  const STROKE_COLOR = 'black'
  const FILL_COLOR = 'black'
  const STROKE_WIDTH = 1.5
  const circleTransform = `translate(${x + 20}, ${y - 30}) scale(${1 / scale})`
  const undoTransform = `translate(${x + 15}, ${y - 35}) scale(${0.5 / scale})`
  const cx = x + 20
  const cy = y - 30

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        return onPointerDown(event)
      }
      default: {
        return true
      }
    }
  }

  function onPointerDown(event) {
    event.preventDefault()
    event.stopPropagation()
    undoDrawing()
    return false
  }

  return (
    <StyledGroup
      ref={ref}
      x={cx}
      y={cy}
      role='button'
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      aria-label={ARIA_LABEL}
      focusable='true'
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
    >
      <Tooltip label='Undo'>
        <circle transform={circleTransform} fill={FILL_COLOR} r={RADIUS} />
      </Tooltip>
      <path
        d='M9.439 20.561l-7.5-7.5c-0.586-0.586-0.586-1.536 0-2.121l7.5-7.5c0.586-0.586 1.536-0.586 2.121 0s0.586 1.536 0 2.121l-4.939 4.939h14.379c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5h-14.379l4.939 4.939c0.293 0.293 0.439 0.677 0.439 1.061s-0.146 0.768-0.439 1.061c-0.586 0.586-1.536 0.586-2.121 0z'
        transform={undoTransform}
        fill='white'
        stroke='white'
      ></path>
    </StyledGroup>
  )
})

UndoButton.propTypes = {
  /**
    Image scale factor. Used to keep line widths and sizes constant at all image scales.
  */
  scale: number,
  /**
    x position of the vertex closets to the origin
  */
  x: number,
  /**
    y position of the vertex closets to the origin
  */
  y: number,
  /**
    Callback to shorten path array by 20 coordinates
  */
  undoDrawing: func
}

export default UndoButton
