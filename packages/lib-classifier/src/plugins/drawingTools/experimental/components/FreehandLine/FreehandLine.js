import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import DragHandle from '../../../components/DragHandle'
import { useTranslation } from '@translations/i18n'

import useScale from '../../../hooks/useScale'

const GRAB_STROKE_WIDTH = 10
const FINISHER_RADIUS = 4

const StyledGroup = styled.g`
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;

  &:hover {
    cursor: pointer;
  }
  &.editing {
    cursor: crosshair;

    g.extend {
      &:hover {
        cursor: crosshair !important;
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

  const [firstPoint, ...restPoints] = points
  const path = [`M ${firstPoint.x},${firstPoint.y}`]

  restPoints.forEach(point => {
    path.push(`L ${point.x},${point.y}`)
  })

  return path.join(' ')
}

const DEFAULT_HANDLER = () => true
function FreehandLine({ active = false, mark, onFinish = DEFAULT_HANDLER }) {
  const scale = useScale()
  // If the user decides to cancel a splice
  if (active === false) {
    mark.inactive()
  }

  // The model uses this internally
  mark.setScale(scale)

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

  const { t } = useTranslation('plugins')
  function getHoverText() {
    // Handles the 4 scenarios of path open vs closed and splicing vs non-splicing
    if (!active) {
      return t('FreehandLine.inactive')
    } else if (mark.spliceDragPointIndex && mark.spliceClosePointIndex) {
      return t('FreehandLine.spliceDrag')
    } else if (mark.spliceDragPointIndex && !mark.spliceClosePointIndex) {
      return t('FreehandLine.closePoint')
    } else if (mark.pathIsClosed && !mark.spliceDragPointIndex) {
      return t('FreehandLine.splicePoint')
    } else {
      return t('FreehandLine.active')
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
            fill='none'
            strokeOpacity={1}
            vectorEffect={'non-scaling-stroke'}
          />
          <title>{getHoverText()}</title>
          <path // Main Path that's clickable. Not visible as its thick for click purposes
            d={pointsToPath(pts)}
            onDoubleClick={onDoubleClick}
            onPointerDown={onPointerDown}
            fill='none'
            strokeWidth={GRAB_STROKE_WIDTH}
            strokeOpacity={0}
            vectorEffect={'non-scaling-stroke'}
          />
        </Fragment>
      })}

      <path // Clipped Path
        d={pointsToPath(mark.splicePathRender)}
        strokeDasharray='2 2'
        opacity=".4"
        vectorEffect={'non-scaling-stroke'}
      />

      {active && mark.closePoint &&
        <circle
          fill='currentColor'
          r={FINISHER_RADIUS / scale}
          cx={mark.closePoint.x}
          cy={mark.closePoint.y}
          vectorEffect={'non-scaling-stroke'}
        />
      }

      {active && mark.dragPoint &&
        <DragHandle
          testid="freehandline-drag-handle"
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
}

export default observer(FreehandLine)
