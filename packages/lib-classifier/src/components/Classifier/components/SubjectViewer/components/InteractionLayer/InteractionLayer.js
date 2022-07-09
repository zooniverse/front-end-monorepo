import cuid from 'cuid'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'
import getFixedNumber from '../../helpers/getFixedNumber'

const DrawingCanvas = styled('rect')`
  ${(props) =>
    props.disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: crosshair;
        `}
`

function InteractionLayer({
  activeMark,
  activeTool,
  activeToolIndex = 0,
  annotation,
  disabled = false,
  frame = 0,
  height,
  marks = [],
  move,
  setActiveMark = () => {},
  scale = 1,
  width,
  played,
  duration
}) {
  const [creating, setCreating] = useState(false)
  const canvas = useRef()

  useEffect(
    function onDeleteMark() {
      if (creating && !activeMark) {
        setCreating(false)
      }
    },
    [activeMark]
  )

  function convertEvent(event) {
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

  function createPoint(event) {
    const { clientX, clientY } = event
    // SVG 2 uses DOMPoint
    if (window.DOMPointReadOnly) {
      return new DOMPointReadOnly(clientX, clientY)
    }
    // jsdom doesn't support SVG
    return {
      x: clientX,
      y: clientY
    }
  }

  function getEventOffset(event) {
    const svgPoint = createPoint(event)
    const svgEventOffset = svgPoint.matrixTransform
      ? svgPoint.matrixTransform(canvas.current?.getScreenCTM().inverse())
      : svgPoint
    return svgEventOffset
  }

  function createMark(event) {
    // TODO: add case for played = undefined
    const timeStamp = getFixedNumber(played, 5)
    const mark = activeTool.createMark({
      id: cuid(),
      frame,
      toolIndex: activeToolIndex
    })

    mark.initialPosition(convertEvent(event))
    setActiveMark(mark)
    setCreating(true)
    mark.setSubTaskVisibility(false)
    // Add a time value for tools that care about time. For most tools, this value is ignored.
    mark.setVideoTime(timeStamp, duration)
    const markIDs = marks.map((mark) => mark.id)
    annotation.update([...markIDs, mark.id])
  }

  function onPointerDown(event) {
    if (disabled || move) {
      return true
    }
    const { target, pointerId } = event
    target.setPointerCapture(pointerId)

    if (!activeTool.type) {
      return false
    }

    if (creating) {
      activeTool.handlePointerDown &&
        activeTool.handlePointerDown(convertEvent(event), activeMark)
      if (activeMark.finished) onFinish(event)
      return true
    }

    createMark(event)
    return false
  }

  function onPointerMove(event) {
    if (creating) {
      activeTool?.handlePointerMove?.(convertEvent(event), activeMark)
    } else {
      // this outputs the mouse coords when not creating (ig: guideline for Polygon)
      activeTool?.handlePointerPosition?.(convertEvent(event), activeMark)
    }
  }

  function onFinish(event) {
    event?.preventDefault?.()
    setCreating(false)
    if (activeMark && !activeMark.isValid) {
      activeTool.deleteMark(activeMark)
      setActiveMark(undefined)
      event?.stopPropagation()
    }
  }

  function onPointerUp(event) {
    if (creating) {
      activeTool.handlePointerUp &&
        activeTool.handlePointerUp(convertEvent(event), activeMark)
      if (activeMark.finished) onFinish(event)
    }
  }

  function onSelectMark(mark) {
    // TODO: can we stop marks from being selected while creating is true?
    activeMark?.finish()
    setActiveMark(mark)
  }

  function inactivateMark() {
    setActiveMark(undefined)
  }

  return (
    <>
      <DrawingCanvas
        ref={canvas}
        disabled={disabled || move}
        pointerEvents={move ? 'none' : 'all'}
        width={width}
        height={height}
        fill='transparent'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <TranscribedLines scale={scale} />
      <SubTaskPopup onDelete={inactivateMark} />
      {marks && (
        <DrawingToolMarks
          activeMark={activeMark}
          marks={marks}
          onDelete={inactivateMark}
          onDeselectMark={inactivateMark}
          onFinish={onFinish}
          onSelectMark={onSelectMark}
          onMove={(mark, difference) => mark.move(difference)}
          scale={scale}
          played={played}
        />
      )}
    </>
  )
}

InteractionLayer.propTypes = {
  activeMark: PropTypes.object,
  activeTool: PropTypes.object.isRequired,
  activeToolIndex: PropTypes.number,
  annotation: PropTypes.shape({
    task: PropTypes.string,
    taskType: PropTypes.string,
    value: PropTypes.array
  }).isRequired,
  frame: PropTypes.number,
  marks: PropTypes.array,
  setActiveMark: PropTypes.func,
  height: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default InteractionLayer
export { DrawingCanvas }
