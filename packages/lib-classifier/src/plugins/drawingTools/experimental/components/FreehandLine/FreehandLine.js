import React, { useRef, useState } from 'react'
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
const GRAB_STROKE_WIDTH = 4
const FINISHER_RADIUS = 3

function createPoint(event) {
  const { clientX, clientY } = event
  // SVG 2 uses DOMPoint
  if (window.DOMPointReadOnly) {
    return new DOMPointReadOnly(clientX, clientY)
  }
  // jsdom doesn't support SVG
  return {
    x: clientX,
    y: clientY
  }
}

function FreehandLine({ active, mark, onFinish, scale }) {
  const { path, initialPoint, lastPoint, finished, isClosed } = mark
  const lineRef = useRef()
  const [editing, setEditing] = useState(false)

  const dragPoint = !mark.isCloseToStart && mark.dragPoint
  const targetPoint = !mark.isCloseToStart && mark.targetPoint
  let clippedPath = mark.clipPath.map(
    (point, index) => index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
  ).join(' ')

  if (editing && !dragPoint) {
    cancelEditing()
  }

  if (!editing && isClosed) {
    clippedPath = ''
  }

  function onDoubleClick(event) {
    const svgPoint = createPoint(event)
    const { x, y } = svgPoint.matrixTransform
      ? svgPoint.matrixTransform(lineRef.current?.getScreenCTM().inverse())
      : svgPoint
    mark.setDragPoint(mark.selectPoint({ x, y }))
    setEditing(true)
  }

  function onClick(event) {
    if (!editing) {
      return true
    }
    const svgPoint = createPoint(event)
    const { x, y } = svgPoint.matrixTransform
      ? svgPoint.matrixTransform(lineRef.current?.getScreenCTM().inverse())
      : svgPoint
    mark.cutSegment(mark.selectPoint({ x, y }))
  }

  function cancelEditing() {
    mark.setTargetPoint(null)
    mark.setDragPoint(null)
    setEditing(false)
  }
  return (
    <StyledGroup
      className={ editing ? 'editing' : undefined}
      ref={lineRef}
      onPointerUp={active ? onFinish : undefined}
    >
      {active && !editing && !isClosed && (
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
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          strokeOpacity: '0',
          strokeWidth: GRAB_STROKE_WIDTH / scale
        }}
        fill='none'
      />
      {active && clippedPath &&
        <path
          d={clippedPath}
          strokeDasharray='2 2'
          strokeWidth={STROKE_WIDTH}
        />
      }
      {active && finished && !editing && !isClosed &&
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
