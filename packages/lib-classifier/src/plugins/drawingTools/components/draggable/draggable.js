import { forwardRef, useContext, useRef, useState } from 'react';
import SVGContext from '../../shared/SVGContext'

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
  const svgPoint = createPoint(event)
  const ctm = canvas?.getScreenCTM()
  const svgEventOffset = ctm && svgPoint.matrixTransform
    ? svgPoint.matrixTransform(ctm.inverse())
    : svgPoint
  return svgEventOffset
}

export function convertEvent(event, canvas) {
  const svgEventOffset = getEventOffset(event, canvas)
  const svgCoordinateEvent = {
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
    const coords = useRef(initialCoords)
    const pointerId = useRef(-1)

    function onDragStart(event) {
      event.stopPropagation()
      event.preventDefault()
      const { x, y } = convertEvent(event, canvas)
      coords.current = { x, y }
      setDragging(true)
      pointerId.current = event.pointerId
      dragStart({ x, y, pointerId: event.pointerId })
      wrappedComponent.current?.setPointerCapture(event.pointerId)
    }

    function onDragMove(event) {
      if (dragging && event.pointerId === pointerId.current) {
        const { x, y } = convertEvent(event, canvas)
        const { currentTarget } = event
        const difference = {
          x: x - coords.current.x,
          y: y - coords.current.y
        }
        dragMove({ currentTarget, x, y, pointerId: event.pointerId }, difference)
        coords.current = { x, y }
      }
    }

    function onDragEnd(event) {
      const { x, y } = convertEvent(event, canvas)
      const { currentTarget } = event
      if (event.pointerId === pointerId.current) {
        dragEnd({ currentTarget, x, y, pointerId: event.pointerId })
      }
      coords.current = { x: null, y: null }
      setDragging(false)
      pointerId.current = -1
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
