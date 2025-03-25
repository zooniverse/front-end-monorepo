import cuid from 'cuid'
import PropTypes from 'prop-types'
import { useContext, useRef, useState } from 'react';
import styled, { css } from 'styled-components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import { convertEvent } from '@plugins/drawingTools/components/draggable/draggable'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'
import { isInBounds } from './helpers/isInBounds'
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

function cancelEvent(event) {
  event.preventDefault()
  event.stopPropagation()
}

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
  multiImageCloneMarkers = false,
  setActiveMark = () => { },
  width,
  played,
  duration
}) {
  const [creating, setCreating] = useState(false)
  const svgContext = useContext(SVGContext)
  const canvasRef = useRef()
  svgContext.canvas = canvasRef.current

  if (creating && !activeMark) {
    setCreating(false)
  }

  if (activeMark?.finished && !activeMark.isValid) {
    activeTool.deleteMark(activeMark)
    setActiveMark(undefined)
  }

  function createMark(event) {
    const timeStamp = getFixedNumber(played, 5)
    const mark = activeTool.createMark({
      id: cuid(),
      // GH Issue 5493 decided multiImageCloneMarkers force new mark frames to 0
      frame: (multiImageCloneMarkers) ? 0 : frame,
      toolIndex: activeToolIndex
    })

    mark.initialPosition(convertEvent(event, canvasRef.current))
    setActiveMark(mark)
    setCreating(true)
    mark.setSubTaskVisibility(false)
    // Add a time value for tools that care about time. For most tools, this value is ignored.
    mark.setVideoTime(timeStamp, duration)
    const markIDs = annotation.value?.map((mark) => mark.id)
    annotation.update([...markIDs, mark.id])
  }

  function onPointerDown(event) {
    if (!disabled) {
      cancelEvent(event)
    }
    if (disabled || move) {
      return true
    }
    const { target, pointerId } = event
    target.setPointerCapture(pointerId)

    if (!activeTool.type) {
      return false
    }

    if (creating) {
      activeTool?.handlePointerDown?.(convertEvent(event, canvasRef.current), activeMark)
      if (activeMark.finished) onFinish(event)
      return true
    }

    createMark(event)
    return false
  }

  function onPointerMove(event) {
    cancelEvent(event)
    if (creating) {
      activeTool?.handlePointerMove?.(convertEvent(event, canvasRef.current), activeMark)
    }
  }

  function onFinish(event) {
    event?.preventDefault?.()
    event?.stopPropagation?.()
    setCreating(false)
    if (activeMark.element && !isInBounds(activeMark.element, canvasRef.current)) {
      activeTool.deleteMark(activeMark)
      setActiveMark(undefined)
    }
  }

  function onPointerUp(event) {
    cancelEvent(event)
    if (creating) {
      activeTool?.handlePointerUp?.(convertEvent(event, canvasRef.current), activeMark)
      if (activeMark.finished) onFinish(event)
    }
  }

  function onSelectMark(mark) {
    setActiveMark(mark)
  }

  function inactivateMark() {
    setActiveMark(undefined)
  }

  return (
    <>
      <DrawingCanvas
        ref={canvasRef}
        disabled={disabled || move}
        pointerEvents={move ? 'none' : 'all'}
        width={width}
        height={height}
        fill='transparent'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <TranscribedLines />
      <SubTaskPopup
        activeMark={activeMark}
        onDelete={inactivateMark}
      />
      <DrawingToolMarks
        activeMark={activeMark}
        marks={marks}
        onDelete={inactivateMark}
        onDeselectMark={inactivateMark}
        onFinish={onFinish}
        onSelectMark={onSelectMark}
        onMove={(mark, difference) => mark.move(difference)}
        pointerEvents={creating ? 'none' : 'painted'}
        played={played}
      />
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
  disabled: PropTypes.bool,
  /** Index of the Frame. Initially inherits from parent Viewer or overwritten in Viewer with SubjectViewerStore */
  frame: PropTypes.number,
  height: PropTypes.number.isRequired,
  marks: PropTypes.array,
  multiImageCloneMarkers: PropTypes.bool,
  setActiveMark: PropTypes.func,
  width: PropTypes.number.isRequired
}

export default InteractionLayer
export { DrawingCanvas }
