import { useContext, useRef, useState } from 'react';
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

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

function getEventOffset(event, canvas) {
  const { clientX, clientY } = event
  const svgPoint = createPoint(event)
  const svgEventOffset = svgPoint.matrixTransform
    ? svgPoint.matrixTransform(canvas.getScreenCTM().inverse())
    : svgPoint
  return svgEventOffset
}

function convertEvent(event, canvas) {
  const svgEventOffset = getEventOffset(event, canvas)
  const svgCoordinateEvent = {
    pointerId: event.pointerId,
    type: event.type,
    x: svgEventOffset.x,
    y: svgEventOffset.y
  }

  return svgCoordinateEvent
}

function draggable(WrappedComponent) {
  function Draggable(props) {
    const { canvas } = useContext(SVGContext)
    const wrappedComponent = useRef()
    const [dragging, setDragging] = useState(false)
    const [coords, setCoords] = useState(props.coords)
    const [pointerId, setPointerId] = useState(-1)

    function getBoundingClientRect() {
      return wrappedComponent.current.getBoundingClientRect()
    }

    function dragStart(event) {
      event.stopPropagation()
      event.preventDefault()
      const { setPointerCapture } = wrappedComponent.current
      const { x, y, pointerId } = convertEvent(event, canvas)
      setCoords({ x, y })
      setDragging(true)
      setPointerId(pointerId)
      props.dragStart({ x, y, pointerId })
      setPointerCapture &&
        wrappedComponent.current.setPointerCapture(pointerId)
    }

    function dragMove(event) {
      if (dragging && event.pointerId === pointerId) {
        const { x, y } = convertEvent(event, canvas)
        const { currentTarget } = event
        const difference = {
          x: x - coords.x,
          y: y - coords.y
        }
        props.dragMove({ currentTarget, x, y, pointerId }, difference)
        setCoords({ x, y })
      }
    }

    function dragEnd(event) {
      const { releasePointerCapture } = wrappedComponent.current
      const point = convertEvent(event, canvas)
      const { currentTarget } = event
      if (point.pointerId === pointerId) {
        props.dragEnd({ currentTarget, x: point.x, y: point.y, pointerId })
        releasePointerCapture &&
          wrappedComponent.current.releasePointerCapture(pointerId)
      }
      setCoords({ x: null, y: null })
      setDragging(false)
      setPointerId(-1)
    }

    return (
      <g
        onPointerDown={dragStart}
        onPointerMove={dragMove}
        onPointerUp={dragEnd}
      >
        <WrappedComponent
          ref={wrappedComponent}
          {...props}
          dragging={dragging}
        >
          {props.children}
        </WrappedComponent>
      </g>
    )
  }

  Draggable.defaultProps = {
    coords: {
      x: 0,
      y: 0
    },
    dragStart: () => true,
    dragMove: () => true,
    dragEnd: () => true
  }
  const name =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    (WrappedComponent.render && WrappedComponent.render.name) ||
    WrappedComponent.toString()
  Draggable.displayName = `draggable(${name})`
  Draggable.wrappedComponent = WrappedComponent

  return Draggable
}

export default draggable
