import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import UndoButton from '../UndoButton'
import DragHandle from '../DragHandle'

const GuideLine = styled.line`
  pointer-events: none;
`

const RADIUS = 3
const GUIDELINE_STROKE_WIDTH = 1
const GRAB_STROKE_WIDTH = 6

function Polygon({ active, mark, scale, onFinish }) {
  const {
    path,
    points,
    initialPoint,
    lastPoint,
    finished,
    guideLineX,
    guideLineY
  } = mark

  const radius = RADIUS
  const guideLineStrokeWidth = GUIDELINE_STROKE_WIDTH
  const grabStrokeWidth = GRAB_STROKE_WIDTH

  function onUndoDrawing() {
    mark.shortenPath()
  }

  function handleClosePolygon(event) {
    mark.finish()
    onFinish(event)
  }

  const fill = finished ? 'transparent' : 'none'
  const strokeDasharray = finished ? undefined : '2 2'

  return (
    <g>
      {active && !finished && points.length > 1 && (
        <UndoButton
          x={initialPoint.x}
          y={initialPoint.y}
          undoDrawing={onUndoDrawing}
        />
      )}

      /* Visible lines */
      <polyline points={path} fill='none' vectorEffect={'non-scaling-stroke'} />

      /* So users can easily select the polygon */
      <polyline
        points={path}
        strokeWidth={grabStrokeWidth}
        strokeOpacity='0'
        fill={fill}
        vectorEffect={'non-scaling-stroke'}
      />

      /* To visibly show a closed polygon */
        <line
          x1={lastPoint.x}
          y1={lastPoint.y}
          x2={initialPoint.x}
          y2={initialPoint.y}
          strokeDasharray={strokeDasharray}
          vectorEffect={'non-scaling-stroke'}
        />

      {active &&
        points.map((point, i) => (
            <DragHandle
              key={`${mark.id}-${i}`}
              r={radius}
              x={point.x}
              y={point.y}
              fill='currentColor'
              dragMove={point.moveTo}
              onPointerDown={handleClosePolygon}
            />
          ))
        }

      {/* Guide Line */}
      {!finished &&
        active &&
        typeof guideLineX === 'number' &&
        typeof guideLineY === 'number' && (
          <GuideLine
            x1={lastPoint.x}
            y1={lastPoint.y}
            x2={guideLineX}
            y2={guideLineY}
            strokeWidth={guideLineStrokeWidth}
            strokeDasharray='2 2'
            vectorEffect={'non-scaling-stroke'}
          />
        )}
    </g>
  )
}

Polygon.propTypes = {
  /**
    Modal active state.
  */
  active: PropTypes.bool,
  /**
    Polygon data: { path, initialPoint, lastPoint, finished }
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
    finished: PropTypes.bool
  }).isRequired,
}

Polygon.defaultProps = {
  active: false,
}

export default observer(Polygon)
