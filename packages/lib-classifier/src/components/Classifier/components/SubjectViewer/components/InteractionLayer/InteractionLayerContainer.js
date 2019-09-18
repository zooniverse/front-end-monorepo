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
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
  }

  componentDidMount () {
    // TODO: We're simply logging the event stream here for now, but this will
    // be passed to the active drawing tool for parsing
    // const stream = this.props.drawing.eventStream
    // stream.subscribe(z => console.log(z))
  }

  addToStream (event) {
    this.props.drawing.addToStream(event)
  }

  onPointerDown (event) {
    this.addToStream(event)
  }

  onPointerMove (event) {
    this.addToStream(event)
  }

  onPointerUp (event) {
    this.addToStream(event)
  }

  render () {
    return (
      <InteractionLayer
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
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
