import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

function storeMapper (stores) {
  const {
    eventStream
  } = stores.classifierStore.drawing
  return {
    eventStream
  }
}

function withCoordsFromStream (WrappedComponent) {
  @inject(storeMapper)
  class CoordsFromStream extends Component {
    constructor () {
      super()

      this.state = {
        activeCoordinates: []
      }

      this.firstSubscription = null
      this.secondSubscription = null

      this.finishDrawing = this.finishDrawing.bind(this)
      this.startDrawing = this.startDrawing.bind(this)
    }

    componentDidMount () {
      this.startDrawing()
    }

    componentWillUnmount () {
      if (this.firstSubscription) {
        this.firstSubscription.unsubscribe()
      }
      if (this.secondSubscription) {
        this.secondSubscription.unsubscribe()
      }
    }

    startDrawing () {
      if (this.props.active) {
        const { eventStream } = this.props
        this.firstSubscription = eventStream.subscribe(event => {
          if (event.type === 'pointerdown') {
            this.secondSubscription = eventStream.subscribe(event => {
              const svgCoordinateEvent = this.convertEvent(event)
              const activeCoordinates = Array.from(this.state.activeCoordinates)
              activeCoordinates.push(svgCoordinateEvent)
              this.setState({ activeCoordinates })
            })
          }
        })
      }
    }

    convertEvent (event) {
      const type = event.type

      const clientX = event.clientX
      const clientY = event.clientY
      const svgEventOffset = this.getEventOffset(clientX, clientY)

      const svgCoordinateEvent = {
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

    finishDrawing (coordinates) {
      this.secondSubscription.unsubscribe()
      this.props.storeMark(coordinates)
    }

    render () {
      const { ...props } = this.props
      const { activeCoordinates } = this.state

      return (
        <WrappedComponent
          coordinates={activeCoordinates}
          finishDrawing={this.finishDrawing}
          {...props}
        />
      )
    }
  }

  CoordsFromStream.wrappedComponent.propTypes = {
    eventStream: PropTypes.object,
    storeMark: PropTypes.func,
    svg: PropTypes.object
  }

  return CoordsFromStream
}

export default withCoordsFromStream
