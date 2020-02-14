import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import DrawingToolMarks from './components/DrawingToolMarks'

const StyledRect = styled('rect')`
  ${props => props.disabled ? 
    css`cursor: not-allowed;` :
    css`cursor: crosshair;`
  }
`

function InteractionLayer ({
  activeDrawingTask,
  activeMark,
  activeTool,
  disabled,
  height,
  marks,
  move,
  scale,
  setActiveMark,
  setSubTaskVisibility,
  width
}) {
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
    if (disabled || move) {
      return true
    }

    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    activeMark.initialPosition(convertEvent(event))
    setActiveMark(activeMark)
    setCreating(true)
    setSubTaskVisibility(false)
    return false
  }

  function onPointerMove (event) {
    if (creating) {
      const { target, pointerId } = event
      target.setPointerCapture(pointerId)
      activeMark.initialDrag(convertEvent(event))
    }
  }

  function onFinish (event) {
    const { target, pointerId } = event
    setCreating(false)
    setSubTaskVisibility(true)
    if (activeMark && !activeMark.isValid) {
      activeTool.deleteMark(activeMark)
      setActiveMark(undefined)
    }
    target.releasePointerCapture(pointerId)
  }

  return (
    <g
      onPointerMove={onPointerMove}
      touch-action='none'
    >
      <StyledRect
        disabled={disabled || move}
        pointerEvents={move ? 'none' : 'all'}
        width={width}
        height={height}
        fill='transparent'
        onPointerDown={onPointerDown}
      />
      {marks &&
        <DrawingToolMarks
          activeMarkId={activeMark && activeMark.id}
          marks={marks}
          onDelete={() => {
            setSubTaskVisibility(false)
            setActiveMark(undefined)
          }}
          onFinish={onFinish}
          onSelectMark={mark => {
            setSubTaskVisibility(true)  // Show sub-task again on select, in case it was closed 
            setActiveMark(mark)
          }}
          scale={scale}
        />
      }
    </g>
  )
}

InteractionLayer.propTypes = {
  activeDrawingTask: PropTypes.object.isRequired,
  activeMark: PropTypes.object,
  activeTool: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  marks: PropTypes.array,
  scale: PropTypes.number,
  setActiveMark: PropTypes.func,
  width: PropTypes.number.isRequired
}

InteractionLayer.defaultProps = {
  activeMark: undefined,
  disabled: false,
  marks: [],
  scale: 1,
  setActiveMark: () => undefined
}

export default InteractionLayer
export { StyledRect }
