import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'

class InteractionLayerContainer extends Component {

  getCoordsFromEvent (event, type) {
    return {
      type,
      x: event.clientX,
      y: event.clientY
    }
  }

  logEvent (event, type) {
    console.info(this.getCoordsFromEvent(event, type))
  }

  onMouseDown = e => this.logEvent(e, 'mousedown')
  onMouseMove = e => this.logEvent(e, 'mousemove')
  onMouseUp = e => this.logEvent(e, 'mouseup')

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

InteractionLayerContainer.propTypes = {
}

InteractionLayerContainer.defaultProps = {
}

export default InteractionLayerContainer
