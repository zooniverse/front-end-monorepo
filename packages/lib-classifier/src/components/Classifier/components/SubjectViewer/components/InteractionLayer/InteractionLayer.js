import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import DrawingToolMarks from './components/DrawingToolMarks'

const StyledRect = styled('rect')`
  cursor: ${props => props.disabled ? 'not-allowed' : 'crosshair'};
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
`

function InteractionLayer ({ activeDrawingTask, activeTool, disabled, height, svg, width }) {
  const [ activeMark, setActiveMark ] = useState(null)
  const [ creating, setCreating ] = useState(false)
  const [ scale, setScale ] = useState(1)
  const interactionLayer = React.createRef()

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
    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    const { width: clientWidth, height: clientHeight } = interactionLayer.current.getBoundingClientRect()
    const scale = clientWidth / width
    setScale(scale)
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
    >
      <StyledRect
        ref={interactionLayer}
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
  svg: PropTypes.instanceOf(Element).isRequired,
  width: PropTypes.number.isRequired
}

InteractionLayer.defaultProps = {
  disabled: false
}

export default InteractionLayer
export { StyledRect }
