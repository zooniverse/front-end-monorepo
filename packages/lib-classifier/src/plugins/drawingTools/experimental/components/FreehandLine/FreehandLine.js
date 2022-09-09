import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import UndoButton from '../../../components/UndoButton'
import DragHandle from '../../../components/DragHandle'

const StyledGroup = styled.g`
  &:hover {
    cursor: pointer;
  }
  g:last-of-type {
    &:hover {
      cursor: crosshair;
    }
  }
  &.editing {
    cursor: grabbing;
  }
`

const STROKE_WIDTH = 1
const GRAB_STROKE_WIDTH = 10
const FINISHER_RADIUS = 3

function createPoint(event) {
  const { clientX, clientY } = event
  // SVG 2 uses DOMPoint
  if (window.DOMPointReadOnly) {
    const svgPoint = new DOMPointReadOnly(clientX, clientY)
    const { x, y } = svgPoint.matrixTransform
      ? svgPoint.matrixTransform(event.target?.getScreenCTM().inverse())
      : svgPoint
    return { x, y }
  }
  // jsdom doesn't support SVG
  return {
    x: clientX,
    y: clientY
  }
}

function cancelEvent(event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function FreehandLine({ active, mark, onFinish, scale }) {
  const { path, initialPoint, lastPoint, finished, isClosed } = mark
  const [editing, setEditing] = useState(false)

  const dragPoint = mark.isCloseToStart ? null : mark.dragPoint
  const targetPoint = mark.isCloseToStart ? null : mark.targetPoint
  const clippedPath = mark.clipPath.map(
    (point, index) => index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
  ).join(' ')
  /*
    Line segmentation has begun if either:
    - a drag point has been created to cut the path internally.
    - the path is open but has a clipped path joining the open ends.
  */
  const segmentationInProgress = dragPoint || (!isClosed && clippedPath)

  if (segmentationInProgress && !editing) {
    setEditing(true)
  }

  // cancel editing when lines become inactive
  if (segmentationInProgress && !active) {
    mark.revertEdits()
    setEditing(false)
  }

  if (active && editing && mark.isCloseToStart) {
    cancelEditing()
  }

  if (active && !segmentationInProgress && clippedPath) {
    // clear the dashed guide line when segmentation ends.
    mark.setClipPath([])
  }

  function onDoubleClick(event) {
    if (active) {
      const { x, y } = createPoint(event)
      mark.setDragPoint({ x, y })
      return cancelEvent(event)
    }
    return true
  }

  function onPointerDown(event) {
    let startPoint
    if (!mark.isClosed && clippedPath) {
      // The last point is always draggable for open lines.
      const { x, y } = mark.lastPoint
      startPoint = { x, y }
    }
    if (mark.dragPoint) {
      // If editing has already started, use the existing drag point.
      const { x, y } = mark.dragPoint
      startPoint = { x, y }
    }
    if (active && startPoint) {
      const endPoint = createPoint(event)
      mark.cutSegment(startPoint, endPoint)
      return cancelEvent(event)
    }
    if (active) {
      return cancelEvent(event)
    }
    return true
  }

  function cancelEditing() {
    mark.setTargetPoint(null)
    mark.setDragPoint(null)
    setEditing(false)
  }

  return (
    <StyledGroup
      className={ editing ? 'editing' : undefined}
      onPointerUp={active ? onFinish : undefined}
    >
      {active && !dragPoint && !isClosed && (
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
          undoDrawing={mark.shortenPath}
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
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        style={{
          strokeOpacity: '0',
          strokeWidth: GRAB_STROKE_WIDTH / scale
        }}
        fill='none'
      />
      {active && clippedPath &&
        <>
          <path
            d={clippedPath}
            strokeDasharray='2 2'
            strokeWidth={STROKE_WIDTH}
          />
          <path
            d={clippedPath}
            onPointerDown={onPointerDown}
            style={{
              strokeOpacity: '0',
              strokeWidth: GRAB_STROKE_WIDTH / scale
            }}
            fill='none'
          />
        </>
      }
      {active && finished && !dragPoint && !isClosed &&
        <DragHandle
          scale={scale}
          x={lastPoint.x}
          y={lastPoint.y}
          fill='transparent'
          invisibleWhenDragging={true}
          dragMove={mark.appendPath}
        />
      }
      {active && targetPoint && (
        <circle
          fill='currentColor'
          r={FINISHER_RADIUS / scale}
          cx={targetPoint.x}
          cy={targetPoint.y}
        />
      )}
      {active && dragPoint &&
        <DragHandle
          scale={scale}
          x={dragPoint.x}
          y={dragPoint.y}
          fill='transparent'
          invisibleWhenDragging={true}
          onClick={!targetPoint ? cancelEditing : undefined}
          dragMove={mark.splicePath}
        />
      }
    </StyledGroup>
  )
}

FreehandLine.propTypes = {
  /**
    Modal active state.
  */
  active: PropTypes.bool,
  /**
    FreehandLine data: { path, initialPoint, lastPoint, finished, isCloseToStart }
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

FreehandLine.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(FreehandLine)
