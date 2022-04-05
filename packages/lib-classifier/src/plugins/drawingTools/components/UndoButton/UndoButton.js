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
  const STROKE_COLOR = 'black'
  const ARROW_STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const STROKE_WIDTH = 1.5
  const ARROW_STROKE_WIDTH = 0.5
  const undoTransform = `translate(${x + 15}, ${y - 35}) scale(${1 / scale})`
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
        <path
          d='M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.628 5.372 12 12 12s12-5.372 12-12zM6 12l6-6v4.5h6v3h-6v4.5l-6-6z'
          transform={undoTransform}
          fill={FILL_COLOR}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
        ></path>
      </Tooltip>
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
    Callback to shorten path array
  */
  undoDrawing: func
}

export default UndoButton
