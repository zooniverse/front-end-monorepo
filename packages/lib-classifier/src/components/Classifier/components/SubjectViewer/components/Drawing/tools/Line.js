import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { combineLatest } from 'rxjs'
import { first, last, map } from 'rxjs/operators'
import DrawingToolRoot from './Root'

function storeMapper (stores) {
  const {
    coordinateStream
  } = stores.classifierStore.drawing
  return {
    coordinateStream
  }
}

@inject(storeMapper)
@observer
class Line extends Component {
  constructor() {
    super()

    this.state = {
      coordinates: null
    }
  }

  componentDidMount () {
    this.setCoordinates()
  }

  componentWillUnmount () {
    if (!!this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  setCoordinates () {
    if (this.props.active) {
      const { coordinateStream } = this.props
      const firstStream = coordinateStream.pipe(
        first(),
        map(event => ({
          x1: event.x,
          y1: event.y
        }))
      )
      const lastStream = coordinateStream.pipe(
        map(event => ({
          type: event.type,
          x2: event.x,
          y2: event.y
        }))
      )

      const lineCoordinates = combineLatest(firstStream, lastStream).pipe(
        map(([firstCoords, lastCoords]) => ({ ...firstCoords, ...lastCoords }))
      )
      this.subscription = lineCoordinates.subscribe(event => this.setState({ coordinates: event }))

    } else {
      this.setState({ coordinates: this.props.coordinates })
    }
  }

  finishDrawing () {
    this.subscription.unsubscribe()
    this.props.finishMark(this.state.coordinates)
  }
  
  render () {
    const { active, tool } = this.props
    const { coordinates } = this.state
    if (!coordinates) return null
    if (active && coordinates.type === 'pointerup') {
      this.finishDrawing()
    }

    return (
      <DrawingToolRoot active tool={tool}>
        <line {...coordinates} />
      </DrawingToolRoot>
    )
  }
}

Line.propTypes = {
  active: PropTypes.bool,
  finishDrawing: PropTypes.func,
  tool: PropTypes.object
}

export default Line
