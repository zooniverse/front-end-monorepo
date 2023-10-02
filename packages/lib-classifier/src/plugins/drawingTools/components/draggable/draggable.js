import { forwardRef, useContext, useRef, useState } from 'react';
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

const DEFAULT_COORDS = {
  x: 0,
  y: 0
}
const DEFAULT_HANDLER = event => true

function draggable(WrappedComponent) {
  function DraggableWithRef({
    children,
    coords: initialCoords = DEFAULT_COORDS,
    dragStart = DEFAULT_HANDLER,
    dragMove = DEFAULT_HANDLER,
    dragEnd = DEFAULT_HANDLER,
    ...rest
  }, ref) {
    const { canvas } = useContext(SVGContext)
    const wrappedComponent = ref || useRef()
    const [dragging, setDragging] = useState(false)
    const [coords, setCoords] = useState(initialCoords)
    const [pointerId, setPointerId] = useState(-1)

    function onDragStart(event) {
      event.stopPropagation()
      event.preventDefault()
      const { setPointerCapture } = wrappedComponent.current
      const { x, y, pointerId } = convertEvent(event, canvas)
      setCoords({ x, y })
      setDragging(true)
      setPointerId(pointerId)
      dragStart({ x, y, pointerId })
      setPointerCapture &&
        wrappedComponent.current.setPointerCapture(pointerId)
    }

    function onDragMove(event) {
      if (dragging && event.pointerId === pointerId) {
        const { x, y } = convertEvent(event, canvas)
        const { currentTarget } = event
        const difference = {
          x: x - coords.x,
          y: y - coords.y
        }
        dragMove({ currentTarget, x, y, pointerId }, difference)
        setCoords({ x, y })
      }
    }

    function onDragEnd(event) {
      const { releasePointerCapture } = wrappedComponent.current
      const point = convertEvent(event, canvas)
      const { currentTarget } = event
      if (point.pointerId === pointerId) {
        dragEnd({ currentTarget, x: point.x, y: point.y, pointerId })
        releasePointerCapture &&
          wrappedComponent.current.releasePointerCapture(pointerId)
      }
      setCoords({ x: null, y: null })
      setDragging(false)
      setPointerId(-1)
    }

    return (
      <g
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
      >
        <WrappedComponent
          ref={wrappedComponent}
          {...rest}
          dragging={dragging}
        >
          {children}
        </WrappedComponent>
      </g>
    )
  }

  const Draggable = forwardRef(DraggableWithRef)
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
