import React, { PureComponent } from 'react'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function draggable(WrappedComponent) {
  class Draggable extends PureComponent {
    constructor(props) {
      super(props)
      this.dragStart = this.dragStart.bind(this)
      this.dragMove = this.dragMove.bind(this)
      this.dragEnd = this.dragEnd.bind(this)
      this.wrappedComponent = React.createRef()
      this.state = {
        coords: {
          x: props.coords.x,
          y: props.coords.y
        },
        dragging: false,
        pointerId: -1
      }
    }

    convertEvent(event) {
      const type = event.type

      const svgEventOffset = this.getEventOffset(event)

      const svgCoordinateEvent = {
        pointerId: event.pointerId,
        type,
        x: svgEventOffset.x,
        y: svgEventOffset.y
      }

      return svgCoordinateEvent
    }

    getBoundingClientRect() {
      return this.wrappedComponent.current.getBoundingClientRect()
    }

    createPoint(event) {
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

    getEventOffset(event) {
      const { clientX, clientY } = event
      const { canvas } = this.context
      const svgPoint = this.createPoint(event)
      const svgEventOffset = svgPoint.matrixTransform
        ? svgPoint.matrixTransform(canvas.getScreenCTM().inverse())
        : svgPoint
      return svgEventOffset
    }

    dragStart(event) {
      event.stopPropagation()
      event.preventDefault()
      const { setPointerCapture } = this.wrappedComponent.current
      const { x, y, pointerId } = this.convertEvent(event)
      this.setState({ coords: { x, y }, dragging: true, pointerId })
      this.props.dragStart({ x, y, pointerId })
      setPointerCapture &&
        this.wrappedComponent.current.setPointerCapture(pointerId)
    }

    dragMove(event) {
      const { coords, dragging, pointerId } = this.state
      if (dragging && event.pointerId === pointerId) {
        const { x, y } = this.convertEvent(event)
        const { currentTarget } = event
        const difference = {
          x: x - coords.x,
          y: y - coords.y
        }
        this.props.dragMove({ currentTarget, x, y, pointerId }, difference)
        this.setState({ coords: { x, y } })
      }
    }

    dragEnd(event) {
      const { releasePointerCapture } = this.wrappedComponent.current
      const { x, y, pointerId } = this.convertEvent(event)
      const { currentTarget } = event
      if (pointerId === this.state.pointerId) {
        this.props.dragEnd({ currentTarget, x, y, pointerId })
        releasePointerCapture &&
          this.wrappedComponent.current.releasePointerCapture(pointerId)
      }
      this.setState({
        coords: { x: null, y: null },
        dragging: false,
        pointerId: -1
      })
    }

    render() {
      const {
        children,
        coords,
        dragStart,
        dragMove,
        dragEnd,
        ...rest
      } = this.props
      const { dragging } = this.state
      return (
        <g
          onPointerDown={this.dragStart}
          onPointerMove={this.dragMove}
          onPointerUp={this.dragEnd}
        >
          <WrappedComponent
            ref={this.wrappedComponent}
            {...rest}
            dragging={dragging}
          >
            {children}
          </WrappedComponent>
        </g>
      )
    }
  }

  Draggable.contextType = SVGContext

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
