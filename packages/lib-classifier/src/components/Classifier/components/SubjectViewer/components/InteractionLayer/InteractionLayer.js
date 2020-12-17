import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'

const DrawingCanvas = styled('rect')`
  ${props => props.disabled ?
    css`cursor: not-allowed;` :
    css`cursor: crosshair;`
  }
`

function InteractionLayer ({
  activeMark,
  activeTool,
  activeToolIndex,
  disabled,
  frame,
  height,
  marks,
  move,
  setActiveMark,
  scale,
  width
}) {
  const [ creating, setCreating ] = React.useState(false)
  const { svg, getScreenCTM } = React.useContext(SVGContext)

  useEffect(function onDeleteMark() {
    if (creating && !activeMark) {
      setCreating(false)
    }
  }, [activeMark])

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

  function createMark (event) {
    const mark = activeTool.createMark({
      id: cuid(),
      frame,
      toolIndex: activeToolIndex
    })

    mark.initialPosition(convertEvent(event))
    setActiveMark(mark)
    setCreating(true)
    mark.setSubTaskVisibility(false)
  }

  function onPointerDown (event) {
    if (disabled || move) {
      return true
    }
    const { target, pointerId } = event
    target.setPointerCapture(pointerId)

    if (!activeTool.type) {
      return false;
    }

    if (creating) {
      activeTool.handlePointerDown && activeTool.handlePointerDown(convertEvent(event), activeMark)
      if (activeMark.finished) onFinish(event)
      return true
    }

    createMark(event)
    return false
  }

  function onPointerMove (event) {
    if (creating) {
      activeTool.handlePointerMove && activeTool.handlePointerMove(convertEvent(event), activeMark)
    }
  }

  function onFinish (event = {}, node) {
    const { target, pointerId } = event

    setCreating(false)
    if (activeMark && !activeMark.isValid) {
      activeTool.deleteMark(activeMark)
      setActiveMark(undefined)
    } else {
      if (node) activeMark?.setSubTaskVisibility(true, node)
    }

    if (target && pointerId) {
      target.releasePointerCapture(pointerId)
    }
  }

  function onPointerUp(event) {
    if (creating) {
      activeTool.handlePointerUp && activeTool.handlePointerUp(convertEvent(event), activeMark)
      if (activeMark.finished) onFinish(event)
    }
  }

  function inactivateMark () {
    setActiveMark(undefined)
  }

  return (
    <g>
      <DrawingCanvas
        disabled={disabled || move}
        pointerEvents={move ? 'none' : 'all'}
        width={width}
        height={height}
        fill='transparent'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        touch-action='none'
      />
      <TranscribedLines
        scale={scale}
      />
      <SubTaskPopup
        onDelete={inactivateMark}
      />
      {marks &&
        <DrawingToolMarks
          activeMark={activeMark}
          marks={marks}
          onDelete={inactivateMark}
          onDeselectMark={inactivateMark}
          onFinish={onFinish}
          onSelectMark={mark => setActiveMark(mark)}
          onMove={(mark, difference) => mark.move(difference)}
          scale={scale}
        />
      }
    </g>
  )
}

InteractionLayer.propTypes = {
  activeMark: PropTypes.object,
  activeTool: PropTypes.object.isRequired,
  activeToolIndex: PropTypes.number,
  frame: PropTypes.number,
  marks: PropTypes.array,
  setActiveMark: PropTypes.func,
  height: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayer.defaultProps = {
  activeMark: undefined,
  activeToolIndex: 0,
  frame: 0,
  marks: [],
  setActiveMark: () => {},
  disabled: false,
  scale: 1
}

export default InteractionLayer
export { DrawingCanvas }
