import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import DrawingToolMarks from './components/DrawingToolMarks'

const StyledRect = styled('rect')`
  cursor: ${props => props.disabled ? 'not-allowed' : 'crosshair'};
`

function InteractionLayer ({ activeDrawingTask, activeTool, disabled, height, scale, svg, usePointer, width }) {
  const [ activeMark, setActiveMark ] = useState(null)
  const [ creating, setCreating ] = useState(false)

  function convertEvent (event) {
    const type = event.type

    const svgEventOffset = getEventOffset(event.clientX, event.clientY)

    const svgCoordinateEvent = {
      pointerId: event.pointerId,
      type,
      x: svgEventOffset.x,
      y: svgEventOffset.y
    }

    return svgCoordinateEvent
  }

  function getEventOffset (x, y) {
    const svgEvent = svg.createSVGPoint()
    svgEvent.x = x
    svgEvent.y = y
    const svgEventOffset = svgEvent.matrixTransform(svg.getScreenCTM().inverse())
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

  const pointerHandlers = {
    onPointerMove,
    onPointerUp
  }

  const mouseHandlers = {
    onMouseMove: onPointerMove,
    onMouseUp: onPointerUp
  }

  const rootProps = usePointer ? pointerHandlers : mouseHandlers

  const rectProps = usePointer ? { onPointerDown } : { onMouseDown: onPointerDown }

  return (
    <g
      {...rootProps}
    >
      <StyledRect
        disabled={disabled}
        width={width}
        height={height}
        fill='transparent'
        {...rectProps}
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
              svg={svg}
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
  svg: PropTypes.instanceOf(Element).isRequired,
  usePointer: PropTypes.bool,
  width: PropTypes.number.isRequired
}

InteractionLayer.defaultProps = {
  disabled: false,
  scale: 1,
  usePointer: !!window.PointerEvent
}

export default InteractionLayer
export { StyledRect }
