import React, { PureComponent } from 'react'

function draggable (WrappedComponent) {
  class Draggable extends PureComponent {
    constructor (props) {
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

    convertEvent (event) {
      const type = event.type

      const svgEventOffset = this.getEventOffset(event.clientX, event.clientY)

      const svgCoordinateEvent = {
        pointerId: event.pointerId,
        type,
        x: svgEventOffset.x,
        y: svgEventOffset.y
      }

      return svgCoordinateEvent
    }

    getEventOffset (x, y) {
      const { svg } = this.props
      const svgEvent = svg.createSVGPoint()
      svgEvent.x = x
      svgEvent.y = y
      const svgEventOffset = svgEvent.matrixTransform(svg.getScreenCTM().inverse())
      return svgEventOffset
    }

    dragStart (event) {
      event.stopPropagation()
      event.preventDefault()
      const { setPointerCapture } = this.wrappedComponent.current
      const { x, y, pointerId } = this.convertEvent(event)
      this.setState({ coords: { x, y }, dragging: true, pointerId })
      this.props.dragStart({ x, y, pointerId })
      setPointerCapture && this.wrappedComponent.current.setPointerCapture(pointerId)
    }

    dragMove (event) {
      const { coords, dragging, pointerId } = this.state
      if (dragging && event.pointerId === pointerId) {
        const { x, y } = this.convertEvent(event)
        const difference = {
          x: x - coords.x,
          y: y - coords.y
        }
        this.props.dragMove(event, difference)
        this.setState({ coords: { x, y } })
      }
    }

    dragEnd (event) {
      const { releasePointerCapture } = this.wrappedComponent.current
      const { x, y, pointerId } = this.convertEvent(event)
      const { currentTarget } = event
      if (pointerId === this.state.pointerId) {
        this.props.dragEnd({ currentTarget, x, y, pointerId })
        releasePointerCapture && this.wrappedComponent.current.releasePointerCapture(pointerId)
      }
      this.setState({ coords: { x: null, y: null }, dragging: false, pointerId: -1 })
    }

    render () {
      const { children, dragStart, dragMove, dragEnd, ...rest } = this.props
      const { dragging } = this.state
      return (
        <g
          onPointerDown={this.dragStart}
          onPointerMove={this.dragMove}
          onPointerUp={this.dragEnd}
        >
          <WrappedComponent
            ref={this.wrappedComponent}
            dragging={dragging}
            {...rest}
          >
            {children}
          </WrappedComponent>
        </g>
      )
    }
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
  const name = WrappedComponent.displayName || WrappedComponent.name
  Draggable.displayName = `draggable(${name})`
  Draggable.wrappedComponent = WrappedComponent

  return Draggable
}

export default draggable
