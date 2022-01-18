import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import UndoButton from '../UndoButton'
import DragHandle from '../DragHandle'

const StyledGroup = styled.g`
  &:hover {
    cursor: pointer;
  }
  g:last-of-type {
    &:hover {
      cursor: crosshair;
    }
  }
`

const STROKE_WIDTH = 2
const GRAB_STROKE_WIDTH = 4
const FINISHER_RADIUS = 3

function Polygon({ active, mark, onFinish, scale }) {
  const { path, initialPoint, lastPoint, finished, isCloseToStart } = mark

  function onHandleDrag(coords) {
    mark.appendPath(coords)
  }

  function onUndoDrawing() {
    mark.shortenPath()
  }

  return (
    <StyledGroup onPointerUp={active ? onFinish : undefined}>
      {active && !isCloseToStart && (
        <circle
          fill='currentColor'
          r={FINISHER_RADIUS / scale}
          cx={initialPoint.x}
          cy={initialPoint.y}
        />
      )}
      {active && (
        <UndoButton
          scale={scale}
          x={initialPoint.x}
          y={initialPoint.y}
          undoDrawing={onUndoDrawing}
        />
      )}
      <path
        d={path}
        style={{
          strokeWidth: STROKE_WIDTH,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: 'none'
        }}
      />
      <path
        d={path}
        style={{
          strokeOpacity: '0',
          strokeWidth: GRAB_STROKE_WIDTH / scale
        }}
      />
      {active && finished && !isCloseToStart && (
        <DragHandle
          scale={scale}
          x={lastPoint.x}
          y={lastPoint.y}
          fill='transparent'
          invisibleWhenDragging={true}
          dragMove={(e) => onHandleDrag(e)}
        />
      )}
    </StyledGroup>
  )
}

Polygon.propTypes = {
  /**
    Modal active state.
  */
  active: PropTypes.bool,
  /**
    Polygon data: { path, initialPoint, lastPoint, finished, isCloseToStart }
  */
  mark: PropTypes.shape({
    path: PropTypes.string,
    initialPoint: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    lastPoint: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    finished: PropTypes.bool,
    isCloseToStart: PropTypes.bool
  }).isRequired,
  /**
    Callback to reset the drawing canvas when creation of the rectangle is finished.
  */
  onFinish: PropTypes.func,
  /**
    Image scale factor. Used to keep line widths and sizes constant at all image scales.
  */
  scale: PropTypes.number
}

Polygon.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(Polygon)
