import { useMemo, useState } from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import DragHandle from '../../../components/DragHandle'

/*

## TODO
- Unit tests
- Icons for LineControls
- Redo
- Autocomplete / snap to close changes based on zoom
- Auto pixels / points save for undo every 10 pixels
- splice-append.. When it "closes", it doesn't add that point to the end

+ WorkflowId and subjectId code refactor
+ Scale width of zoom level line width
+ Undo & X button get in the way of drawing
+ Create the drawing tools toolbar
+ Autoclose optional

*/

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

function linePath({ dragPoint, isClosed, points, targetPoint }) {
  const [firstCoord, ...otherCoords] = points
  if (!firstCoord) {
    return ''
  }
  const path = [`M ${firstCoord.x},${firstCoord.y}`]
  otherCoords.forEach(point => {
    const { x, y } = point
    const isTarget = (x === targetPoint?.x) && (y === targetPoint?.y)
    const pointPath = isTarget ? `M ${x},${y}` : `L ${x},${y}`
    path.push(pointPath)
  })
  // closes the drawing path
  if (isClosed) {
    if (dragPoint) {
      const { x, y } = firstCoord
      path.push(`L ${x},${y}`)
    } else {
      path.push(`Z`)
    }
  }
  return path.join(' ')
}

const GRAB_STROKE_WIDTH = 10
const FINISHER_RADIUS = 3

function FreehandLine({ active, mark, onFinish, scale }) {
  const { initialPoint, lastPoint, finished, isClosed, points } = mark
  const [editing, setEditing] = useState(false)
  const dragPoint = mark.isCloseToStart ? null : mark.dragPoint
  const targetPoint = mark.isCloseToStart ? null : mark.targetPoint
  const path = useMemo(() => linePath(
    { dragPoint, isClosed, points, targetPoint }),
    [dragPoint, isClosed, points, targetPoint]
  )

  // Stroke width varies as a function of the zoom level. Ranges 1.25-5.75
  const STROKE_WIDTH = (6 - scale)


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
    // TODO: handle this a bit better?
    // mark.splicePathEnd??
    // mark.appendPathEnd??
    // finish??
    console.log('cancelEditing');
    mark.setTargetPoint(null)
    mark.setDragPoint(null)
    setEditing(false)
  }

  return (
    <StyledGroup
      data-testid="mark-focusable"
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
            opacity=".4"
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
      {active && !finished && !dragPoint && !isClosed &&
        <DragHandle
          testid="drawing-drag-handle"
          scale={scale}
          x={lastPoint.x}
          y={lastPoint.y}
          fill='transparent'
          invisibleWhenDragging={true}
          dragStart={mark.appendPathStart}
          dragMove={mark.appendPath}
          dragEnd={mark.appendPathEnd}
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
          dragStart={mark.splicePathStart}
          dragMove={mark.splicePath}
          dragEnd={mark.splicePathEnd}
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
    Callback to reset the drawing canvas when creation of the line is finished.
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
