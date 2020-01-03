import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import DrawingToolMarks from './components/DrawingToolMarks'

const StyledRect = styled('rect')`
  cursor: ${props => props.disabled ? 'not-allowed' : 'crosshair'};
`

function InteractionLayer ({ activeDrawingTask, activeTool, disabled, height, scale, width }) {
  const [ activeMark, setActiveMark ] = useState(null)
  const [ creating, setCreating ] = useState(false)
  const { svg, getScreenCTM } = useContext(SVGContext)

  function convertEvent (event) {
    const type = event.type

    const svgEventOffset = getEventOffset(event)

    const svgCoordinateEvent = {
      pointerId: event.pointerId,
      type,
      x: svgEventOffset.x,
      y: svgEventOffset.y
    }

    return svgCoordinateEvent
  }

  function getEventOffset (event) {
    const svgPoint = svg.createSVGPoint()
    svgPoint.x = event.clientX
    svgPoint.y = event.clientY
    const svgEventOffset = svgPoint.matrixTransform(getScreenCTM().inverse())
    return svgEventOffset
  }

  function onPointerDown (event) {
    if (disabled) {
      return false
    }
    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    activeMark.initialPosition(convertEvent(event))
    setActiveMark(activeMark)
    setCreating(true)
  }

  function onPointerMove (event) {
    creating && activeMark.initialDrag(convertEvent(event))
  }

  function onPointerUp () {
    setCreating(false)
    if (activeMark && !activeMark.isValid) {
      activeTool.deleteMark(activeMark)
      setActiveMark(null)
    }
  }

  return (
    <g
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      touch-action='none'
    >
      <StyledRect
        disabled={disabled}
        width={width}
        height={height}
        fill='transparent'
        onPointerDown={onPointerDown}
      />
      {activeDrawingTask &&
        activeDrawingTask.tools.map(tool => {
          return (
            <DrawingToolMarks
              key={`${tool.type}-${tool.color}`}
              activeMarkId={activeMark && activeMark.id}
              onDelete={() => setActiveMark(null)}
              onSelectMark={mark => setActiveMark(mark)}
              scale={scale}
              tool={tool}
            />
          )
        })
      }
    </g>
  )
}

InteractionLayer.propTypes = {
  activeDrawingTask: PropTypes.object.isRequired,
  activeTool: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayer.defaultProps = {
  disabled: false,
  scale: 1
}

export default InteractionLayer
export { StyledRect }
