import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const { drawing } = stores.classifierStore
  return {
    drawing
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  constructor () {
    super()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  componentDidMount () {
    // TODO: We're simply logging the event stream here for now, but this will
    // be passed to the active drawing tool for parsing
    // const stream = this.props.drawing.eventStream
    // stream.subscribe(z => console.log(z))
  }

  addToStream (event, type) {
    this.props.drawing.addToStream({
      event: type,
      target: event.target,
      x: event.clientX,
      y: event.clientY
    })
  }

  onMouseDown (event) {
    this.addToStream(event, 'mousedown')
  }

  onMouseMove (event) {
    this.addToStream(event, 'mousemove')
  }

  onMouseUp (event) {
    this.addToStream(event, 'mouseup')
  }

  render () {
    return (
      <InteractionLayer
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  drawing: PropTypes.shape({
    addToStream: PropTypes.func.isRequired
  })
}

export default InteractionLayerContainer
