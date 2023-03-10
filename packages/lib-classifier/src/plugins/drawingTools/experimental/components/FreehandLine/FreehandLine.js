import { Fragment } from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import DragHandle from '../../../components/DragHandle'

const GRAB_STROKE_WIDTH = 10
const FINISHER_RADIUS = 4

const StyledGroup = styled.g`
  &:hover {
    cursor: pointer;
  }
  &.editing {
    cursor: crosshair;

    g.extend {
      &:hover {
        cursor: grabbing !important;
      }
  
      circle:hover {
        cursor: grab !important;
      }
    }
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

function pointsToPath(points) {
  if (points.length === 0) {
    return ''
  }

  const [firstPoint, ...restPoints] = points;
  const path = [`M ${firstPoint.x},${firstPoint.y}`]

  restPoints.forEach(point => {
    path.push(`L ${point.x},${point.y}`)
  })

  return path.join(' ')
}

function FreehandLine({ active, mark, onFinish, scale }) {
  // If the user decides to cancel a splice
  if (active === false) {
    mark.inactive()
  }

  // The model uses this internally
  mark.setScale(scale)

  // Stroke width varies as a function of the zoom level. Ranges 1-5.75
  const STROKE_WIDTH = (scale < 3) ? (4 - scale) : 1

  function onDoubleClick(event) {
    if (active) {
      mark.splicePathDragPoint(createPoint(event))
    }
    return cancelEvent(event)
  }

  function onPointerDown(event) {
    // We only care about click when but we need to cancel this event first
    if (active) {
      mark.splicePathClosePoint(createPoint(event))
      return cancelEvent(event)
    }
  }

  function getHoverText() {
    // Handles the 4 scenarios of path open vs closed and splicing vs non-splicing
    if (!active) {
      return 'Click to edit this line'
    } else if (mark.spliceDragPointIndex && mark.spliceClosePointIndex) {
      return 'Click and drag from the open point to the close point'
    } else if (mark.spliceDragPointIndex && !mark.spliceClosePointIndex) {
      return 'Click anywhere on the line to set the close point'
    } else if (mark.pathIsClosed && !mark.spliceDragPointIndex) {
      return 'Double click anywhere on the line to create a splice point'
    } else {
      return 'Click and drag from the open point to the close point or double click anywhere on the line to create a splice point'
    }
  }

  return (
    <StyledGroup
      data-testid="mark-focusable"
      className={active ? 'editing' : undefined}
      onPointerUp={active ? onFinish : undefined}
    >
      {mark.visiblePathsRender.map((pts, i) => {
        return <Fragment key={i}>
          <path // Main Path that's visible
            d={pointsToPath(pts)}
            style={{
              strokeWidth: STROKE_WIDTH,
              strokeLinejoin: 'round',
              strokeLinecap: 'round',
              fill: 'none',
              strokeOpacity: (active) ? '1' : '0.6',
            }}
          />
          <title>{getHoverText()}</title>
          <path // Main Path that's clickable. Not visible as its thick for click purposes
            d={pointsToPath(pts)}
            onDoubleClick={onDoubleClick}
            onPointerDown={onPointerDown}
            style={{
              strokeOpacity: '0',
              strokeWidth: GRAB_STROKE_WIDTH / scale
            }}
            fill='none'
          />
        </Fragment>
      })}

      <path // Clipped Path
        d={pointsToPath(mark.splicePathRender)}
        strokeDasharray='2 2'
        strokeWidth={STROKE_WIDTH}
        opacity=".4"
      />

      {active && mark.closePoint &&
        <circle
          fill='currentColor'
          r={FINISHER_RADIUS / scale}
          cx={mark.closePoint.x}
          cy={mark.closePoint.y}
        />
      }

      {active && mark.dragPoint &&
        <DragHandle
          testid="freehandline-drag-handle"
          scale={scale}
          x={mark.dragPoint.x}
          y={mark.dragPoint.y}
          fill='none'
          invisibleWhenDragging={true}
          dragStart={mark.appendPathStart}
          dragMove={mark.appendPath}
          dragEnd={mark.appendPathEnd}
          className='extend'
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
  scale: 1,
}

export default observer(FreehandLine)
