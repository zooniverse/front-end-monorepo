import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import UndoButton from '../UndoButton'
import DragHandle from '../DragHandle'

const GuideLine = styled.line`
  pointer-events: none;
`

const RADIUS = 3
const STROKE_WIDTH = 3
const GUIDELINE_STROKE_WIDTH = 2
const GRAB_STROKE_WIDTH = 6

function Polygon({ active, mark, scale }) {
  const {
    path,
    points,
    initialPoint,
    lastPoint,
    finished,
    guideLineX,
    guideLineY
  } = mark

  const radius = RADIUS / scale
  const strokeWidth = STROKE_WIDTH / scale
  const guideLineStrokeWidth = GUIDELINE_STROKE_WIDTH / scale
  const grabStrokeWidth = GRAB_STROKE_WIDTH / scale

  function onHandleDrag(coords, i) {
    mark.setCoordinates(coords, i)
  }

  function onUndoDrawing() {
    mark.continueDrawing()
    mark.shortenPath()
  }

  function handleClosePolygon(i) {
    return i === 0
      ? () => {
          mark.finish()
        }
      : null
  }

  return (
    <g>
      {active && !finished && points.length > 1 && (
        <UndoButton
          scale={scale}
          x={initialPoint.x}
          y={initialPoint.y}
          undoDrawing={onUndoDrawing}
        />
      )}

      {/* Visible lines */}
      <polyline points={path} strokeWidth={strokeWidth} fill='none' />

      {/* So users can easily select the polygon */}
      <polyline
        points={path}
        strokeWidth={grabStrokeWidth}
        strokeOpacity='0'
        fill='none'
      />

      {/* To visibly show a closed polygon */}
      {finished && (
        <line
          x1={lastPoint.x}
          y1={lastPoint.y}
          x2={initialPoint.x}
          y2={initialPoint.y}
          strokeWidth={strokeWidth}
        />
      )}

      {active &&
        points.map((point, i) => {
          if (i === 0) {
            /* Initial Point */
            return (
              <circle
                key={`${mark.id}-${i}`}
                r={radius}
                cx={point.x}
                cy={point.y}
                fill='currentColor'
                onPointerDown={handleClosePolygon(i)}
              />
            )
          }

          /* All other points in the Polygon */
          return (
            <DragHandle
              key={`${mark.id}-${i}`}
              scale={scale}
              r={radius}
              x={point.x}
              y={point.y}
              fill='currentColor'
              dragMove={(_e, d) =>
                onHandleDrag(
                  {
                    x: points[i].x + d.x,
                    y: points[i].y + d.y
                  },
                  i
                )
              }
            />
          )
        })}

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
  /**
    Image scale factor. Used to keep line widths and sizes constant at all image scales.
  */
  scale: PropTypes.number
}

Polygon.defaultProps = {
  active: false,
  scale: 1
}

export default observer(Polygon)
